import logging
from typing import Optional
from backend.app.core.config import settings

logger = logging.getLogger(__name__)

supabase_client = None

try:
    from supabase import create_client, Client
    if settings.SUPABASE_URL and settings.SUPABASE_KEY and "demo" not in settings.SUPABASE_URL:
        supabase_client: Optional[Client] = create_client(
            settings.SUPABASE_URL,
            settings.SUPABASE_SERVICE_ROLE_KEY or settings.SUPABASE_KEY
        )
        logger.info("Supabase client initialized successfully.")
    else:
        logger.warning("Supabase URL or Key not set to live instance; running in development mock mode.")
except Exception as e:
    logger.warning(f"Could not initialize remote Supabase client: {e}. Fallback mode active.")

def get_supabase_client():
    return supabase_client
