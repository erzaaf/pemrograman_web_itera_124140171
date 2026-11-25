"""View default: halaman informasi API."""

from pyramid.view import view_config


@view_config(route_name="home", renderer="json")
def home(request):
    """GET / - informasi singkat dan daftar endpoint API.

    Args:
        request (Request): request Pyramid.

    Returns:
        dict: nama aplikasi, versi, dan daftar endpoint.
    """
    return {
        "aplikasi": "RESTful API Manajemen Matakuliah",
        "versi": "1.0",
        "endpoints": {
            "mahasiswa": [
                "GET    /api/mahasiswa",
                "GET    /api/mahasiswa/{id}",
                "POST   /api/mahasiswa",
                "PUT    /api/mahasiswa/{id}",
                "DELETE /api/mahasiswa/{id}",
            ],
            "matakuliah": [
                "GET    /api/matakuliah",
                "GET    /api/matakuliah/{id}",
                "POST   /api/matakuliah",
                "PUT    /api/matakuliah/{id}",
                "DELETE /api/matakuliah/{id}",
            ],
        },
    }
