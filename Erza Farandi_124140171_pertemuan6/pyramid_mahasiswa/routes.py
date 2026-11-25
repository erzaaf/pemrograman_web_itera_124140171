"""Daftar route (URL dispatch) aplikasi RESTful API."""


def includeme(config):
    """Daftarkan seluruh route beserta predikat request_method.

    Args:
        config (Configurator): konfigurator Pyramid.
    """
    config.add_route("home", "/")

    # Endpoint koleksi mahasiswa
    config.add_route(
        "mahasiswa_collection", "/api/mahasiswa", request_method="GET")
    config.add_route(
        "mahasiswa_create", "/api/mahasiswa", request_method="POST")

    # Endpoint detail mahasiswa
    config.add_route(
        "mahasiswa_detail", "/api/mahasiswa/{id}", request_method="GET")
    config.add_route(
        "mahasiswa_update", "/api/mahasiswa/{id}", request_method="PUT")
    config.add_route(
        "mahasiswa_delete", "/api/mahasiswa/{id}", request_method="DELETE")

    # Endpoint koleksi matakuliah
    config.add_route(
        "matakuliah_collection", "/api/matakuliah", request_method="GET")
    config.add_route(
        "matakuliah_create", "/api/matakuliah", request_method="POST")

    # Endpoint detail matakuliah
    config.add_route(
        "matakuliah_detail", "/api/matakuliah/{id}", request_method="GET")
    config.add_route(
        "matakuliah_update", "/api/matakuliah/{id}", request_method="PUT")
    config.add_route(
        "matakuliah_delete", "/api/matakuliah/{id}", request_method="DELETE")
