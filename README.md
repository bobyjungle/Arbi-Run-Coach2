# Arbi Run Coach — Android MVP

Native Android starter + secure Strava OAuth backend.

## Build APK
Requires Android Studio with Android SDK 35 and JDK 17/21.
Open this folder in Android Studio, let Gradle sync, then Build > Build APK(s).

## Strava backend
Set:
- STRAVA_CLIENT_ID=282991
- STRAVA_CLIENT_SECRET=<your secret; never commit it>
- STRAVA_REDIRECT_URI=https://YOUR-BACKEND-DOMAIN.example.com/oauth/callback

Deploy backend separately over HTTPS. Update MainActivity.java `backend` URL to your deployed `/auth/strava` endpoint.

## Important
The included backend is an MVP OAuth demonstration. Before production, add encrypted token storage, user sessions, refresh-token rotation handling, CSRF/state validation, rate limiting, and persistent activity sync.
