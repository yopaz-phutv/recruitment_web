# Hướng dẫn cài đặt

## 1. Chuẩn bị môi trường
- XAMPP: chứa web server Apache, MySQL
- Node.js: môi trường phát triển ReactJS
- Composer: công cụ quản lý các thư viện trong php

## 2. Cài đặt dự án
### 2.1. Chạy XAMPP
- Mở XAMPP, chạy 2 dịch vụ Apache và MySQL
- Truy cập http://localhost/phpmyadmin/, tạo database với tên **recruitment**
### 2.2. Phía backend
Truy cập vào thư mục "backend", thực hiện:
- Duplicate tệp **.env.example**, đổi tên thành **.env**
- `composer install` : cài đặt package
- `php artisan migrate` : migrate database 
- `php artisan db:seed` : chạy các file seeder tạo dữ liệu mẫu
- `php artisan serve` : khởi động server

### 2.2. Phía frontend
Truy cập vào thư mục "frontend", thực hiện:
- `npm install` : cài đặt package
- `npm start` : chạy ứng dụng web trên môi trường local

#### *Lưu ý: Đảm bảo kết nối Internet để các chức năng: gửi thông báo realtime, gửi email hoạt động được
#### *Một số tài khoản người dùng trong hệ thống:
- Tài khoản ứng viên:

![image](https://github.com/tranphu033/recruitment_web/assets/82558208/3b8592a9-5e2e-4e0b-8f43-8cdb90bc1205)
- Tài khoản nhà tuyển dụng:

![image](https://github.com/tranphu033/recruitment_web/assets/82558208/6687be99-c018-4998-b64c-c85f5ae3d118)


