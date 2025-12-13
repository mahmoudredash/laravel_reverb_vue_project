# Laravel Reverb Vue.js SPA Starter Project

![Laravel Logo](https://raw.githubusercontent.com/laravel/art/master/logo-lockup-starter.svg) ![Vue.js Logo](https://vuejs.org/images/logo.png) ![Docker Logo](https://raw.githubusercontent.com/docker/docs/main/static/img/docker_icon.png)

A modern Full-Stack application boilerplate combining Laravel 12 (with Reverb for real-time functionality) and a Vue.js 3 Single Page Application (SPA) frontend. This project emphasizes a containerized development and deployment workflow using Docker Compose, secure environment management, and a robust CI/CD pipeline with GitHub Actions.

---

## 🌟 Features

- **Laravel 12 Backend:**
  - RESTful API development.
  - Laravel Sanctum for API authentication (SPA-friendly).
  - Laravel Reverb for real-time WebSocket communication.
  - SQLite database for local development.
  - PHP 8.3.
- **Vue.js 3 Frontend (SPA):**
  - Built with Vite for a fast development experience.
  - Vue Router for client-side navigation.
  - Axios for HTTP requests.
  - Laravel Echo for seamless integration with Reverb.
  - Tailwind CSS for rapid UI development.
- **Containerized Development:**
  - Docker Compose for easy setup and consistent environments (Laravel FPM, Nginx, Vue.js Dev Server, Reverb Server).
  - Secure handling of sensitive environment variables using Docker Compose secrets.
- **Authentication:**
  - Full SPA authentication flow using Laravel Sanctum, including CSRF protection and session management.
- **Real-time Capabilities:**
  - Demonstrates real-time event broadcasting from Laravel to Vue.js using Reverb.
- **CI/CD Integration:**
  - GitHub Actions workflow for automated testing (Laravel & Vue.js) and Docker Compose deployment to a remote server.

---

## 🚀 Technologies Used

- **Backend:**
  - [PHP 8.3](https://www.php.net/)
  - [Laravel 12](https://laravel.com/)
  - [Laravel Reverb](https://laravel.com/docs/12.x/reverb) (WebSocket server)
  - [Laravel Sanctum](https://laravel.com/docs/12.x/sanctum) (API Authentication)
  - [SQLite](https://www.sqlite.org/index.html) (Database)
- **Frontend:**
  - [Vue.js 3](https://vuejs.org/)
  - [Vite](https://vitejs.dev/)
  - [Vue Router 4](https://router.vuejs.org/)
  - [Axios](https://axios-http.com/)
  - [Laravel Echo](https://laravel.com/docs/12.x/broadcasting#installing-laravel-echo)
  - [Tailwind CSS 3](https://tailwindcss.com/)
- **Containerization:**
  - [Docker](https://www.docker.com/)
  - [Docker Compose](https://docs.docker.com/compose/)
- **DevOps:**
  - [GitHub Actions](https://docs.github.com/actions)

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- **Docker Desktop** (includes Docker Engine and Docker Compose): [Install Docker](https://docs.docker.com/get-docker/)
- **Git**: [Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- **Text Editor/IDE** (e.g., VS Code)

---

## ⚙️ Local Development Setup

Follow these steps to get your project running locally using Docker Compose.

### 1. Clone the Repository

```bash
git clone https://github.com/mahmoudredash/laravel_reverb_vue_project.git
cd laravel_reverb_vue_project
```

### 2. Environment Configuration

#### 2.1. Root `.env` for Docker Compose

Create a `.env` file in the **root** of your `laravel_reverb_vue_project` directory (the same level as `docker-compose.yml`). This file holds non-sensitive variables that Docker Compose will use.

```dotenv
# filepath: .env (at project root)
# This file should ideally be in your .gitignore for production,
# but can be used for local convenience.

APP_HOST=project.test
FRONTEND_HOST=project.test
FRONTEND_PORT=5173

APP_DEBUG=true

REVERB_APP_ID=756774
REVERB_APP_KEY=nm8iqicab6qn9rk6rjat
```

#### 2.2. Docker Compose Secrets

For sensitive data (`APP_KEY`, `REVERB_APP_SECRET`), we use Docker Compose secrets.

1.  Create a directory `.secrets` in the **root** of your project:
    ```bash
    mkdir .secrets
    ```
2.  Add `.secrets/` to your root `.gitignore` file:
    ```
    # .gitignore (at project root)
    .secrets/
    ```
3.  Create the secret files within `.secrets/`:

    - **`.secrets/app_key.txt`**: Generate a new Laravel app key (e.g., by running `php artisan key:generate` in a fresh Laravel project and copying the output, or use `base64:YOUR_GENERATED_KEY_HERE`).

      ```
      base64:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      ```

    - **`.secrets/reverb_app_secret.txt`**: Use your Reverb application secret.
      ```
      your_reverb_app_secret_here
      ```

#### 2.3. Laravel Backend (`vue-reverb-integration/.env`)

Navigate into the `vue-reverb-integration` directory and create/update its `.env` file. This is mainly for Laravel-specific configurations not directly managed by Docker Compose environment variables or secrets.

```dotenv
# filepath: vue-reverb-integration/.env
APP_NAME=Laravel
APP_ENV=local
# APP_KEY is now managed by Docker Compose secrets
APP_DEBUG=${APP_DEBUG:-true} # Fallback if not set in root .env
APP_URL=http://${APP_HOST:-project.test} # Sourced from root .env or default

DB_CONNECTION=sqlite
DB_DATABASE=/var/www/html/database/database.sqlite # Path inside container

BROADCAST_CONNECTION=reverb
# REVERB_APP_ID, REVERB_APP_KEY, REVERB_APP_SECRET are sourced from Docker Compose
REVERB_HOST=reverb # Internal Docker DNS name
REVERB_PORT=8080
REVERB_SCHEME=http

SESSION_DOMAIN=.${APP_HOST:-project.test}
SANCTUM_STATEFUL_DOMAINS=${FRONTEND_HOST:-project.test}:${FRONTEND_PORT:-5173}
FRONTEND_URL=http://${FRONTEND_HOST:-project.test}:${FRONTEND_PORT:-5173}

# ... other Laravel-specific settings ...
```

#### 2.4. Vue.js Frontend (`Client/.env`)

Navigate into the `Client` directory and create/update its `.env` file. This handles `VITE_` prefixed variables for the frontend.

```dotenv
# filepath: Client/.env
VITE_APP_NAME="Laravel"

# These will be sourced from docker-compose.yml environment which uses root .env
VITE_AXIOS_BASE_URL=http://${APP_HOST:-project.test}
VITE_REVERB_APP_KEY=${REVERB_APP_KEY}
VITE_REVERB_HOST=${APP_HOST:-project.test}
VITE_REVERB_PORT=8080
VITE_REVERB_SCHEME=http

VITE_BASE_URL=/
```

### 3. Host File Modification

Add the following entry to your host file (e.g., `/etc/hosts` on Linux/macOS, `C:\Windows\System32\drivers\etc\hosts` on Windows) to map `project.test` to your local machine:

```
127.0.0.1 project.test
```

### 4. Build and Run Docker Compose

Navigate back to the **root** of your `laravel_reverb_vue_project` directory and run:

```bash
# Build the Docker images (only needed once or after Dockerfile changes)
docker compose build

# Start the services in detached mode
docker compose up -d
```

### 5. Run Initial Laravel Commands

Execute essential Laravel commands within the `laravel_app` container:

```bash
# Generate application key (if not already set in .secrets/app_key.txt)
# docker compose exec laravel_app php artisan key:generate --force

# Run database migrations
docker compose exec laravel_app php artisan migrate

# (Optional) Seed the database
# docker compose exec laravel_app php artisan db:seed

# Clear Laravel caches
docker compose exec laravel_app php artisan config:clear
docker compose exec laravel_app php artisan cache:clear
docker compose exec laravel_app php artisan view:clear

# Link storage (if you're using public storage)
docker compose exec laravel_app php artisan storage:link
```

### 6. Access the Applications

- **Laravel Backend (API):** `http://project.test`
- **Vue.js Frontend (SPA):** `http://project.test:5173`
- **Reverb WebSocket Server:** `ws://project.test:8080` (This is for client connections, not directly browsable)

---

## 📝 Usage

- **Login/Register:** Access `http://project.test:5173/login` to interact with the Laravel Sanctum authentication.
- **Dashboard:** After logging in, you should be redirected to the dashboard (`http://project.test:5173/`).
- **Real-time Events:** If you have a `PostCreated` event set up in Laravel that broadcasts on the `posts` channel, you can observe the console logs in your Vue.js application when such an event is dispatched from the backend.

---

## 🧪 Testing

### Laravel Backend Tests

To run the PHPUnit tests for your Laravel backend:

```bash
docker compose exec laravel_app php artisan test
```

### Vue.js Frontend Tests

(If you have frontend tests set up with tools like Jest or Cypress)

```bash
docker compose exec vue_app npm test
# or
docker compose exec vue_app yarn test
```

---

## 🚀 Deployment

This project includes a GitHub Actions CI/CD pipeline (`.github/workflows/ci-cd.yml`) for automated testing and deployment.

### Workflow Overview:

1.  **`test_laravel`**: Runs PHPUnit tests for the Laravel backend.
2.  **`test_vue`**: Installs dependencies and builds the Vue.js frontend (you can extend this with Jest/Cypress tests).
3.  **`deploy`**:
    - **Trigger**: Only runs on `push` to the `main` branch, _after_ both test jobs pass.
    - **Secrets**: Leverages GitHub Secrets for SSH credentials and sensitive application keys (`APP_KEY`, `REVERB_APP_SECRET`).
    - **Deployment Method**: Uses `rsync` over SSH to transfer code to a remote server.
    - **Remote Commands**: Connects via SSH to the remote server to:
      - Create Docker Compose `.env` files dynamically using GitHub Secrets.
      - Pull latest Docker images.
      - Build and start Docker Compose services (`docker compose up -d --build`).
      - Run Laravel migrations and clear caches.

### Setting up Deployment:

1.  **Remote Server**: Ensure your remote server has Docker, Docker Compose, and `envsubst` installed.
2.  **GitHub Secrets**: Configure the following secrets in your GitHub repository settings:
    - `SSH_PRIVATE_KEY`
    - `SSH_HOST`
    - `SSH_USERNAME`
    - `APP_KEY`
    - `REVERB_APP_SECRET`
    - `REVERB_APP_ID`
    - `REVERB_APP_KEY_PUBLIC`
    - `APP_HOST` (e.g., `your-domain.com`)
    - `FRONTEND_HOST` (e.g., `your-domain.com`)
    - `FRONTEND_PORT` (e.g., `80` or `5173` depending on your Nginx setup)
    - `DEPLOY_PATH` (e.g., `/var/www/your-project-path`)
3.  **DNS Configuration**: Point your `APP_HOST` and `FRONTEND_HOST` domains to the IP address of your remote server.

---

## 👋 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -am 'Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Create a new Pull Request.

---

## 📄 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
