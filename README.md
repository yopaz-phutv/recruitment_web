# Hướng dẫn cài đặt

## 1. Chuẩn bị môi trường
- XAMPP: chứa web server Apache, MySQL
- Node.js: môi trường phát triển ReactJS
- Composer: công cụ quản lý các thư viện trong php

## 2. Cài đặt dự án
### 2.1. Chạy XAMPP
- Mở XAMPP, chạy 2 dịch vụ Apache và MySQL

### 2.2. Phía backend
Truy cập vào thư mục "backend", thực hiện:
- Duplicate tệp ***.env.example***, đổi tên thành ***.env***
- `composer install` : cài đặt package
- `php artisan migrate` : migrate database 
- `php artisan migrate:refresh --seed` : chạy các file seeder tạo dữ liệu mẫu
- `php artisan serve` : khởi động server

### 2.2. Phía frontend
Truy cập vào thư mục "frontend", thực hiện:
- `npm install` : cài đặt package
- `npm start` : chạy ứng dụng web trên môi trường local

#### Lưu ý: đảm bảo kết nối Internet để các chức năng: gửi thông báo realtime, gửi email hoạt động được
