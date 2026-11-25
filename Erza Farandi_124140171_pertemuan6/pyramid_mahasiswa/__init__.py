"""Konfigurasi utama aplikasi Pyramid RESTful API Manajemen Matakuliah."""

from pyramid.config import Configurator
from sqlalchemy import engine_from_config, pool
from sqlalchemy.orm import sessionmaker


def main(global_config, **settings):
    """Bangun dan kembalikan aplikasi WSGI Pyramid.

    Args:
        global_config (dict): konfigurasi global dari PasteDeploy.
        **settings: pengaturan dari berkas .ini (termasuk sqlalchemy.url).

    Returns:
        WSGIApplication: aplikasi Pyramid yang siap dijalankan pserve.
    """
    config = Configurator(settings=settings)

    # Satu engine dan session factory untuk seluruh aplikasi.
    engine = engine_from_config(
        settings, "sqlalchemy.", poolclass=pool.NullPool)
    config.registry.dbmaker = sessionmaker(bind=engine)

    def get_dbsession(request):
        """Buat session database baru untuk satu request."""
        return request.registry.dbmaker()

    config.add_request_method(get_dbsession, "dbsession", reify=True)

    config.include("pyramid_mahasiswa.routes")
    config.scan("pyramid_mahasiswa.views")
    return config.make_wsgi_app()
