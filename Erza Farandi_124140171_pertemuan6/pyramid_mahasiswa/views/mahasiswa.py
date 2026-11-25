"""View controller CRUD untuk data mahasiswa."""

from pyramid.httpexceptions import HTTPBadRequest, HTTPNotFound
from pyramid.view import view_config

from pyramid_mahasiswa.models.mahasiswa import Mahasiswa

FIELD_WAJIB = ("nim", "nama", "jurusan", "angkatan")


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
    """Validasi field mahasiswa pada body request.

    Args:
        body (dict): data yang dikirim klien.
        wajib_semua (bool): True saat POST, False saat PUT.

    Returns:
        str | None: pesan kesalahan, atau None bila data valid.
    """
    if wajib_semua:
        kurang = [field for field in FIELD_WAJIB
                  if body.get(field) in (None, "")]
        if kurang:
            return "Field wajib belum lengkap: " + ", ".join(kurang)

    for field in ("nim", "nama", "jurusan"):
        if field in body and not str(body[field]).strip():
            return f"Field '{field}' tidak boleh kosong"

    if "angkatan" in body:
        nilai = body["angkatan"]
        if isinstance(nilai, bool) or not isinstance(nilai, int):
            return "Field 'angkatan' harus berupa bilangan bulat"
        if nilai <= 0:
            return "Field 'angkatan' harus lebih dari 0"
    return None


def _cari_atau_404(request):
    """Cari mahasiswa berdasarkan id pada URL.

    Args:
        request (Request): request dengan matchdict berisi id.

    Raises:
        HTTPNotFound: jika id tidak valid atau data tidak ditemukan.

    Returns:
        Mahasiswa: objek mahasiswa yang dicari.
    """
    try:
        id_mahasiswa = int(request.matchdict["id"])
    except (KeyError, TypeError, ValueError):
        raise HTTPNotFound(json_body={
            "status": "error",
            "message": "ID mahasiswa tidak valid",
        })

    mahasiswa = request.dbsession.get(Mahasiswa, id_mahasiswa)
    if mahasiswa is None:
        raise HTTPNotFound(json_body={
            "status": "error",
            "message": f"Mahasiswa dengan id {id_mahasiswa} tidak ditemukan",
        })
    return mahasiswa


@view_config(route_name="mahasiswa_collection", renderer="json")
def daftar_mahasiswa(request):
    """GET /api/mahasiswa - tampilkan seluruh mahasiswa.

    Args:
        request (Request): request Pyramid.

    Returns:
        dict: daftar mahasiswa dalam bentuk JSON.
    """
    daftar = (request.dbsession.query(Mahasiswa)
              .order_by(Mahasiswa.id)
              .all())
    return {
        "status": "success",
        "total": len(daftar),
        "data": [mahasiswa.to_dict() for mahasiswa in daftar],
    }


@view_config(route_name="mahasiswa_detail", renderer="json")
def detail_mahasiswa(request):
    """GET /api/mahasiswa/{id} - detail satu mahasiswa.

    Args:
        request (Request): request Pyramid.

    Returns:
        dict: data mahasiswa yang dicari.
    """
    mahasiswa = _cari_atau_404(request)
    return {"status": "success", "data": mahasiswa.to_dict()}


@view_config(route_name="mahasiswa_create", renderer="json")
def tambah_mahasiswa(request):
    """POST /api/mahasiswa - tambahkan mahasiswa baru.

    Args:
        request (Request): request Pyramid dengan body JSON.

    Raises:
        HTTPBadRequest: jika field wajib kurang, tipe data salah, atau
            nim sudah dipakai.

    Returns:
        dict: data mahasiswa yang baru dibuat.
    """
    body = _ambil_body(request)

    pesan_error = _validasi(body)
    if pesan_error:
        raise HTTPBadRequest(json_body={
            "status": "error", "message": pesan_error})

    nim = str(body["nim"]).strip()
    sudah_ada = (request.dbsession.query(Mahasiswa)
                 .filter(Mahasiswa.nim == nim).first())
    if sudah_ada is not None:
        raise HTTPBadRequest(json_body={
            "status": "error",
            "message": f"nim '{nim}' sudah digunakan",
        })

    mahasiswa = Mahasiswa(
        nim=nim,
        nama=str(body["nama"]).strip(),
        jurusan=str(body["jurusan"]).strip(),
        angkatan=body["angkatan"],
    )
    request.dbsession.add(mahasiswa)
    request.dbsession.commit()
    request.dbsession.refresh(mahasiswa)

    return {
        "status": "success",
        "message": "Mahasiswa berhasil ditambahkan",
        "data": mahasiswa.to_dict(),
    }


@view_config(route_name="mahasiswa_update", renderer="json")
def ubah_mahasiswa(request):
    """PUT /api/mahasiswa/{id} - perbarui data mahasiswa.

    Args:
        request (Request): request Pyramid dengan body JSON.

    Raises:
        HTTPBadRequest: jika body kosong atau nilainya tidak valid.
        HTTPNotFound: jika mahasiswa tidak ditemukan.

    Returns:
        dict: data mahasiswa setelah diperbarui.
    """
    mahasiswa = _cari_atau_404(request)
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

    if "nim" in body:
        nim = str(body["nim"]).strip()
        bentrok = (request.dbsession.query(Mahasiswa)
                   .filter(Mahasiswa.nim == nim,
                           Mahasiswa.id != mahasiswa.id).first())
        if bentrok is not None:
            raise HTTPBadRequest(json_body={
                "status": "error",
                "message": f"nim '{nim}' sudah digunakan",
            })
        mahasiswa.nim = nim

    if "nama" in body:
        mahasiswa.nama = str(body["nama"]).strip()
    if "jurusan" in body:
        mahasiswa.jurusan = str(body["jurusan"]).strip()
    if "angkatan" in body:
        mahasiswa.angkatan = body["angkatan"]

    request.dbsession.commit()
    request.dbsession.refresh(mahasiswa)

    return {
        "status": "success",
        "message": "Mahasiswa berhasil diperbarui",
        "data": mahasiswa.to_dict(),
    }


@view_config(route_name="mahasiswa_delete", renderer="json")
def hapus_mahasiswa(request):
    """DELETE /api/mahasiswa/{id} - hapus mahasiswa.

    Args:
        request (Request): request Pyramid.

    Raises:
        HTTPNotFound: jika mahasiswa tidak ditemukan.

    Returns:
        dict: data mahasiswa yang sudah dihapus.
    """
    mahasiswa = _cari_atau_404(request)
    data = mahasiswa.to_dict()

    request.dbsession.delete(mahasiswa)
    request.dbsession.commit()

    return {
        "status": "success",
        "message": "Mahasiswa berhasil dihapus",
        "data": data,
    }
