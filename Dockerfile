# Ruby pinned to match .ruby-version (3.4). Debian "slim" => glibc, so the
# precompiled x86_64-linux / aarch64-linux-gnu native gems already locked in
# Gemfile.lock (ffi, sass-embedded, google-protobuf) apply directly.
# Not jekyll/jekyll: that image is Alpine/musl, unmaintained, and ships its
# own Bundler/Jekyll instead of honoring our committed lockfile.
FROM ruby:3.4-slim

# build-essential: C-extension fallback if a gem ever lacks a precompiled
# platform variant. git: some gems/plugins inspect it. curl: healthchecks.
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      build-essential git curl \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /srv/jekyll

# Match Gemfile.lock "BUNDLED WITH" exactly so --frozen is byte-stable.
# (README's "Bundler 2.4+" is stale; the lockfile is on 4.x.)
RUN gem install bundler:4.0.14

# Dependency layer: cache-keyed on the manifests only, so source edits don't
# bust the gem install. Gems live OUTSIDE the app dir so the dev bind-mount
# can't shadow them; the same path is a named volume in docker-compose.
COPY Gemfile Gemfile.lock ./
ENV BUNDLE_PATH=/usr/local/bundle \
    BUNDLE_FROZEN=true \
    BUNDLE_JOBS=4
RUN bundle install

# App source last (overlaid by the bind-mount in dev; baked in for prod).
COPY . .

# 4000 = jekyll serve / static preview; 35729 = livereload websocket.
EXPOSE 4000 35729

# Default = PT development server. The prod compose service overrides the command.
# A layered --config is mandatory or nothing renders (_config.yml alone has no
# collections_dir/data_dir). 0.0.0.0 so the host can reach it; --force_polling
# because macOS bind mounts don't deliver inotify events into the container.
# No --incremental: it reuses cached page output and misses global config
# changes (e.g. baseurl), serving stale URLs like /site-ercas2026/.
ENV JEKYLL_CONFIG=_config.yml,_config.pt.yml
CMD ["sh", "-c", "bundle exec jekyll serve --config $JEKYLL_CONFIG --host 0.0.0.0 --livereload --force_polling"]
