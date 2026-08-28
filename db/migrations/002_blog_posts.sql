-- Blog / news posts, written by Birra staff through the admin page at
-- /admin/blog rather than by editing site code.
--
-- Each post belongs to one locale rather than carrying parallel EN/AR copy —
-- the admin is a single free-text form, not a translation tool, so a post is
-- whatever language the person writing it used. The public blog page filters
-- to the site's current locale.

CREATE TABLE IF NOT EXISTS blog_posts (
  id            BIGSERIAL   PRIMARY KEY,

  locale        TEXT        NOT NULL CHECK (locale IN ('en', 'ar')),
  slug          TEXT        NOT NULL,
  title         TEXT        NOT NULL,
  category      TEXT,
  excerpt       TEXT        NOT NULL,
  body          TEXT        NOT NULL,
  image_url     TEXT,

  -- Drafts are saved but never returned to the public site.
  published     BOOLEAN     NOT NULL DEFAULT false,
  published_at  TIMESTAMPTZ,

  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE (locale, slug)
);

-- Public blog pages list published posts for one locale, newest first.
CREATE INDEX IF NOT EXISTS blog_posts_public_listing_idx
  ON blog_posts (locale, published, published_at DESC)
  WHERE published;

-- Admin listing shows everything, newest-created-first.
CREATE INDEX IF NOT EXISTS blog_posts_created_at_idx
  ON blog_posts (created_at DESC);
