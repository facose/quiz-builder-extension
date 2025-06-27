# syntax=docker/dockerfile:1

# This Dockerfile is designed for development/interview use
ARG RUBY_VERSION=3.4.4
FROM docker.io/library/ruby:$RUBY_VERSION-slim

# Rails app lives here
WORKDIR /rails

# Install packages
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    build-essential \
    curl \
    git \
    libpq-dev \
    libyaml-dev \
    pkg-config \
    postgresql-client \
    && rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Set development environment
ENV RAILS_ENV="development" \
    BUNDLE_PATH="/usr/local/bundle"

# Install application gems
COPY Gemfile Gemfile.lock ./
RUN bundle install

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Start the Rails server
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
