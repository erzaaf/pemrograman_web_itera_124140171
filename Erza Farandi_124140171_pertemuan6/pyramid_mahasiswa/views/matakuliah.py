"""View controller CRUD untuk data matakuliah."""

from pyramid.httpexceptions import HTTPBadRequest, HTTPNotFound
from pyramid.view import view_config

from pyramid_mahasiswa.models.matakuliah import Matakuliah

FIELD_WAJIB = ("kode_mk", "nama_mk", "sks", "semester")


def _ambil_body(request):
    """Ambil body JSON request dan pastikan berbentuk objek.

    Args:
        request (Request): request Pyramid.

    Raises:
        HTTPBadRequest: jika body bukan JSON objek yang valid.

    Returns:
        dict: isi body request.
    """
    try:
        body = request.json_body
    except ValueError:
        raise HTTPBadRequest(json_body={
            "status": "error",
            "message": "Body request harus berupa JSON yang valid",
        })
    if not isinstance(body, dict):
        raise HTTPBadRequest(json_body={
            "status": "error",
            "message": "Body request harus berupa objek JSON",
        })
    return body


def _validasi(body, wajib_semua=True):
    """Validasi field matakuliah pada body request.

    Args:
        body (dict): data yang dikirim klien.
        wajib_semua (bool): True saat POST (semua field wajib diisi),
            False saat PUT (hanya field yang dikirim yang divalidasi).

    Returns:
        str | None: pesan kesalahan, atau None bila data valid.
    """
    if wajib_semua:
        kurang = [field for field in FIELD_WAJIB
                  if body.get(field) in (None, "")]
        if kurang:
            return "Field wajib belum lengkap: " + ", ".join(kurang)

    for field in ("kode_mk", "nama_mk"):
        if field in body and not str(body[field]).strip():
            return f"Field '{field}' tidak boleh kosong"

    for field in ("sks", "semester"):
        if field in body:
            nilai = body[field]
            if isinstance(nilai, bool) or not isinstance(nilai, int):
                return f"Field '{field}' harus berupa bilangan bulat"
            if nilai <= 0:
                return f"Field '{field}' harus lebih dari 0"
    return None


def _cari_atau_404(request):
    """Cari matakuliah berdasarkan id pada URL.

    Args:
        request (Request): request dengan matchdict berisi id.

    Raises:
        HTTPNotFound: jika id tidak valid atau data tidak ditemukan.

    Returns:
        Matakuliah: objek matakuliah yang dicari.
    """
    try:
        id_matakuliah = int(request.matchdict["id"])
    except (KeyError, TypeError, ValueError):
        raise HTTPNotFound(json_body={
            "status": "error",
            "message": "ID matakuliah tidak valid",
        })

    matakuliah = request.dbsession.get(Matakuliah, id_matakuliah)
    if matakuliah is None:
        raise HTTPNotFound(json_body={
            "status": "error",
            "message": (f"Matakuliah dengan id {id_matakuliah} "
                        "tidak ditemukan"),
        })
    return matakuliah


@view_config(route_name="matakuliah_collection", renderer="json")
def daftar_matakuliah(request):
    """GET /api/matakuliah - tampilkan seluruh matakuliah.

    Args:
        request (Request): request Pyramid.

    Returns:
        dict: daftar matakuliah dalam bentuk JSON.
    """
    daftar = (request.dbsession.query(Matakuliah)
              .order_by(Matakuliah.id)
              .all())
    return {
        "status": "success",
        "total": len(daftar),
        "data": [matakuliah.to_dict() for matakuliah in daftar],
    }


@view_config(route_name="matakuliah_detail", renderer="json")
def detail_matakuliah(request):
    """GET /api/matakuliah/{id} - detail satu matakuliah.

    Args:
        request (Request): request Pyramid.

    Returns:
        dict: data matakuliah yang dicari.
    """
    matakuliah = _cari_atau_404(request)
    return {"status": "success", "data": matakuliah.to_dict()}


@view_config(route_name="matakuliah_create", renderer="json")
def tambah_matakuliah(request):
    """POST /api/matakuliah - tambahkan matakuliah baru.

    Args:
        request (Request): request Pyramid dengan body JSON.

    Raises:
        HTTPBadRequest: jika field wajib kurang, tipe data salah, atau
            kode_mk sudah dipakai.

    Returns:
        dict: data matakuliah yang baru dibuat.
    """
    body = _ambil_body(request)

    pesan_error = _validasi(body)
    if pesan_error:
        raise HTTPBadRequest(json_body={
            "status": "error", "message": pesan_error})

    kode_mk = str(body["kode_mk"]).strip().upper()
    sudah_ada = (request.dbsession.query(Matakuliah)
                 .filter(Matakuliah.kode_mk == kode_mk).first())
    if sudah_ada is not None:
        raise HTTPBadRequest(json_body={
            "status": "error",
            "message": f"kode_mk '{kode_mk}' sudah digunakan",
        })

    matakuliah = Matakuliah(
        kode_mk=kode_mk,
        nama_mk=str(body["nama_mk"]).strip(),
        sks=body["sks"],
        semester=body["semester"],
    )
    request.dbsession.add(matakuliah)
    request.dbsession.commit()
    request.dbsession.refresh(matakuliah)

    return {
        "status": "success",
        "message": "Matakuliah berhasil ditambahkan",
        "data": matakuliah.to_dict(),
    }


@view_config(route_name="matakuliah_update", renderer="json")
def ubah_matakuliah(request):
    """PUT /api/matakuliah/{id} - perbarui data matakuliah.

    Args:
        request (Request): request Pyramid dengan body JSON.

    Raises:
        HTTPBadRequest: jika body kosong atau nilainya tidak valid.
        HTTPNotFound: jika matakuliah tidak ditemukan.

    Returns:
        dict: data matakuliah setelah diperbarui.
    """
    matakuliah = _cari_atau_404(request)
    body = _ambil_body(request)

    if not body:
        raise HTTPBadRequest(json_body={
            "status": "error",
            "message": "Tidak ada field yang dikirim untuk diperbarui",
        })

    pesan_error = _validasi(body, wajib_semua=False)
    if pesan_error:
        raise HTTPBadRequest(json_body={
            "status": "error", "message": pesan_error})

    if "kode_mk" in body:
        kode_mk = str(body["kode_mk"]).strip().upper()
        bentrok = (request.dbsession.query(Matakuliah)
                   .filter(Matakuliah.kode_mk == kode_mk,
                           Matakuliah.id != matakuliah.id).first())
        if bentrok is not None:
            raise HTTPBadRequest(json_body={
                "status": "error",
                "message": f"kode_mk '{kode_mk}' sudah digunakan",
            })
        matakuliah.kode_mk = kode_mk

    if "nama_mk" in body:
        matakuliah.nama_mk = str(body["nama_mk"]).strip()
    if "sks" in body:
        matakuliah.sks = body["sks"]
    if "semester" in body:
        matakuliah.semester = body["semester"]

    request.dbsession.commit()
    request.dbsession.refresh(matakuliah)

    return {
        "status": "success",
        "message": "Matakuliah berhasil diperbarui",
        "data": matakuliah.to_dict(),
    }


@view_config(route_name="matakuliah_delete", renderer="json")
def hapus_matakuliah(request):
    """DELETE /api/matakuliah/{id} - hapus matakuliah.

    Args:
        request (Request): request Pyramid.

    Raises:
        HTTPNotFound: jika matakuliah tidak ditemukan.

    Returns:
        dict: data matakuliah yang sudah dihapus.
    """
    matakuliah = _cari_atau_404(request)
    data = matakuliah.to_dict()

    request.dbsession.delete(matakuliah)
    request.dbsession.commit()

    return {
        "status": "success",
        "message": "Matakuliah berhasil dihapus",
        "data": data,
    }
