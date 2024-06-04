<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmployerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('employers')->insert([
            [
                'id' => 11,
                'user_id' => 11,
                'name' => 'CÔNG TY CỔ PHẦN DỊCH VỤ TRUYỀN THÔNG ĐA PHƯƠNG TIỆN VIỆT NAM',
                'address' => 'Số 4A, B18 Yên Lãng, Phường Thịnh Quang, Quận Đống Đa, Thành phố Hà Nội, Việt Nam',
                'min_employees' => 25,
                'max_employees' => 99,
                'contact_name' => 'Trần Hồng Ngọc',
                'phone' => '0333333333',
                'website' => null,
                'description' => null,
                'logo' => null,
                'image' => null,
                'latitude' => 21.011024, 
                'longitude' => 105.814989,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id' => 12,
                'user_id' => 12,
                'name' => 'Công ty TNHH Netbase Outsourcing',
                'address' => 'Tầng 03, Số nhà 25, Tập thể Sư Đoàn 361, Phường Yên Hoà, Quận Cầu Giấy, TP Hà Nội, Việt Nam',
                'min_employees' => 25,
                'max_employees' => 99,
                'contact_name' => 'Trần Hồng Ngọc',
                'phone' => '0333333333',
                'website' => 'https://netbasejsc.com/',
                'description' => 'Công ty Netbase Outsourcing chuyên hoạt động trong lĩnh vực gia công phần mềm, web app, website uy tín trên thị trường nước ngoài. Chúng tôi đã phục vụ cho hơn 2100+ khách hàng Châu Âu, Châu Á, Bắc Mỹ… qua website www.cmsmart.net chuyên bán các sản phẩm TMĐT dựa trên Mã nguồn mở, website www.netbasejsc.com chuyên cung cấp dịch vụ gia công và giá trị gia tăng cho TMĐT, website www.printcart.com là kênh chợ trung gian dành cho thị trường in ấn toàn cầu.
                Với chặng đường phát triển dài, đem đến các giá trị cốt lõi bền vững, hiện nay Netbase đã và đang xây dựng môi trường làm việc chuyên nghiệp, cạnh tranh và sáng tạo. Chúng tôi cần tuyển dụng thêm nhân sự có trình độ, khả năng chuyên môn và tác phong chuyên nghiệp cho công ty.',
                'logo' => null,
                'image' => null,
                'latitude' => 21.00822, 
                'longitude' => 105.807611,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id' => 13,
                'user_id' => 13,
                'name' => 'CÔNG TY TNHH ZINZA TECHNOLOGY',
                'address' => 'Tầng 3 Hoàng Ngọc Tower, Lô C2C, ngõ 72 Trần Thái Tông, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam',
                'min_employees' => 25,
                'max_employees' => 99,
                'contact_name' => 'Trần Hồng Ngọc',
                'phone' => '0333333333',
                'website' => 'https://zinza.com.vn/',
                'description' => '',
                'logo' => 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-tnhh-zinza-technology-5a139dbbb10f4_rs.jpg',
                'image' => 'https://static.topcv.vn/company_covers/cong-ty-tnhh-zinza-technology-012acb445b677a73527a9b914dbe202d-60b1b16acbaf9.jpg',
                'latitude' => 21.029937, 
                'longitude' => 105.785086,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id' => 14,
                'user_id' => 14,
                'name' => 'BSS Group',
                'address' => 'Tầng 14, 16, 18 và 19, tòa nhà Viwaseen, số 48 Tố Hữu, Nam Từ Liêm, Hà Nội',
                'min_employees' => 25,
                'max_employees' => 99,
                'contact_name' => 'Trần Hồng Ngọc',
                'phone' => '0333333333',
                'website' => 'http://bssgroup.vn/',
                'description' => 'BSS Commerce is the leading brand of BSS Group - the top full-service eCommerce development agency in Vietnam. Since 2012, BSS Commerce has become a trusted partner of global online merchants with 500+ successful projects and 21,000+ satisfied clients (B2B, B2C và B2B2C). We now provide a wide range of products and services on multiple platforms, including Magento, Shopify Plus, BigCommerce, Shopware, and more to match the business needs for every client worldwide
                Find out more about BSS Commerce’s products and services: https://bsscommerce.com/
                
                BSS Commerce là thương hiệu nền tảng của BSS Group - đối tác cung cấp các giải pháp thương mại điện tử toàn diện cho Doanh nghiệp Việt Nam và toàn cầu. Được thành lập từ 2012, BSS Commerce đã và đang đồng hành với hơn 21,000 khách hàng trên toàn thế giới (B2B, B2C và B2B2C). Chúng tôi mang đến các sản phẩm, dịch vụ tối ưu cho doanh nghiệp trên đa nền tảng như Magento, Shopify Plus, BigCommerce, Shopware, etc, để đáp ứng mọi nhu cầu của khách hàng trên toàn thế giới. 
                Tìm hiểu thêm về sản phẩm và dịch vụ của BSS Commerce tại: https://bsscommerce.com/',
                'logo' => 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/OVnIWeKWVJRFSVPkPiVw9tYykgyI173s_1697534823____97c5ab9281684baba35417a7d09a9bc3.png',
                'image' => 'https://static.topcv.vn/company_covers/bss-group-c5569f385386627142ea3587d862f008-6167ceda23e34.jpg',
                'latitude' => 20.9978385,
                'longitude' => 105.7974438,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id' => 15,
                'user_id' => 15,
                'name' => 'Công ty Cổ phần Phần mềm Vitex Việt Nam',
                'address' => 'Tòa nhà Sông Đà, số 18 ngõ 165 đường Cầu Giấy, Cầu Giấy',
                'min_employees' => 25,
                'max_employees' => 99,
                'contact_name' => 'Trần Hồng Ngọc',
                'phone' => '0333333333',
                'website' => 'https://vitex.asia/',
                'description' => 'Vitex - Vietnam IT Excellence Network
                Vitex is your bridge to excellent IT people, service providers and software products in Vietnam',
                'logo' => 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-co-phan-phan-mem-vitex-viet-nam-612f11ca86189.jpg',
                'image' => null,
                'latitude' => 21.031497, 
                'longitude' => 105.796483,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id' => 16,
                'user_id' => 16,
                'name' => 'CÔNG TY CỔ PHẦN ADAMO SOFTWARE',
                'address' => 'Tòa Lilama10, số 56 Tố Hữu, Trung Văn, Nam Từ Liêm, Hà Nội',
                'min_employees' => 100,
                'max_employees' => 499,
                'contact_name' => 'Trần Hồng Ngọc',
                'phone' => '0333333333',
                'website' => 'https://adamosoft.com/',
                'description' => 'Adamo là công ty phát triển phần mềm, gia công ứng dụng CNTT quốc tế tại Việt Nam. Hiện Adamo cung cấp các dịch vụ phát triển website, ứng dụng điện thoại thông minh và giải pháp cho khách hàng tại Mỹ, châu Âu, Úc và Singapore.',
                'logo' => null,
                'image' => null,
                'latitude' => 20.997785, 
                'longitude' => 105.793742,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id' => 17,
                'user_id' => 17,
                'name' => 'CÔNG TY CỔ PHẦN TRUYỀN THÔNG VĂN HOÁ VIỆT',
                'address' => 'P322-324 Tháp đông, sàn TM, chung cư Học Viện Quốc Phòng, Xuân La, Tây Hồ, Hà Nội',
                'min_employees' => 25,
                'max_employees' => 99,
                'contact_name' => 'Trần Hồng Ngọc',
                'phone' => '0333333333',
                'website' => 'https://vhv.vn/',
                'description' => 'Công ty cổ phần truyền thông Văn Hóa Việt được xây dựng dựa trên niềm tin sâu sắc của chúng tôi rằng con đường ứng dụng công nghệ thông tin, đặc biệt là các ứng dụng trực tuyến là con đường ngắn nhất, phù hợp nhất để đưa Việt Nam bắt kịp với trình độ phát triển của các quốc gia khác trên thế giới, cụ thể hơn là tăng cường năng lực cạnh tranh, tốc độ phát triển của các doanh nghiệp Việt Nam. Chúng tôi muốn đóng góp năng lực, trí tuệ của mình trên con đường đó, cũng là sứ mệnh mà tất cả cán bộ công nhân viên của Văn Hóa Việt cùng hướng tới.
                VHV ra đời với sứ mệnh nhân bản tri thức, phục vụ cộng đồng. tạo ra framework (nền tảng công nghệ) thương hiệu Việt Nam ngang tầm quốc tế.
                Chúng tôi tập trung vào nhiệm vụ xây dựng một sản phẩm website đảm bảo các tiêu chí sau:
                1. Tiết kiệm chi phí tối đa, phù hợp với tình hình kinh tế khó khăn hiện tại của đất nước, phù hợp với đa số các doanh nghiệp.
                2. Đảm bảo đầy đủ các điều kiện để doanh nghiệp quảng bá, kinh doanh trên mạng Internet
                3. Đủ sức mạnh để tùy biến phù hợp với nhiều mục đích sử dụng, nhiều ngành nghề, và dễ thay đổi, nâng cấp theo thời gian.
                Sau 01 năm nghiên cứu và phát triển, cuối cùng đội ngũ kỹ thuật của chúng tôi cũng hoàn thành sản phẩm, và chỉ sau nửa năm triển khai, đến nay chúng tôi đã phục vụ được cho trên 400 doanh nghiệp cỡ vừa và nhỏ, thậm chí cỡ lớn thuộc nhiều lĩnh vực từ thương mại, dịch vụ đến giáo dục đào tạo hay du lịch, bất động sản. Chúng tôi cũng rất vinh dự nhận được sự hài lòng của phần lớn khách hàng.                
                VHV được xây dựng trên niềm tin mang lại cơ hội mới, tăng năng lực cạnh tranh cho các doanh nghiệp Việt Nam, với trí tuệ và công nghệ sẽ giúp cho Việt Nam nhanh chóng bắt kịp với Thế giới. Văn hóa Việt luôn nỗ lực hết mình để mang lại lợi ích tốt nhất cho khách hàng với việc tối thiểu hóa chi phí và nâng cao năng lực cạnh tranh cho khách hàng.',
                'logo' => 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-co-phan-truyen-thong-van-hoa-viet-5e7c501d0e2fe.jpg',
                'image' => 'https://static.topcv.vn/company_covers/83oyFEKfASwaGQDYEJ9p.jpg',
                'latitude' => 21.0500198, 
                'longitude' => 105.7973772,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id' => 18,
                'user_id' => 18,
                'name' => 'CÔNG TY TNHH GIẢI PHÁP IMS',
                'address' => 'Building 59 Chế Lan Viên, P . Tây Thạnh, Quận Tân Phú, Tp.HCM',
                'min_employees' => 25,
                'max_employees' => 99,
                'contact_name' => 'Trần Hồng Ngọc',
                'phone' => '0333333333',
                'website' => 'https://thietkewebsite24h.com/',
                'description' => 'Được thành lập 11/2009, với niềm đam mê và khát vọng thành công cùng hướng đi rõ ràng, IMS nhanh chóng khẳng định được vị trí hàng đầu trong lĩnh vực thiết kế web và phần mềm quản lý doanh nghiệp với 2 sản phẩm chủ đạo là IMS.
                Đến tháng 4/2018, Nền tảng quản lý và bán hàng đa kênh được sử dụng nhiều nhất Việt Nam với hơn 2,000 khách hàng. IMS hội tụ đội ngũ lập trình kỹ sư giỏi với nhiều năm kinh nghiệm triển khai và phát triển thương hiệu cho doanh nghiệp, tổ chức,... Với kinh nghiệm hơn 11 năm trong lĩnh vực IMS luôn đón nhận các giải pháp công nghệ mới nhất hiện nay làm vui lòng khách hàng khi đến với chúng tôi.                
                Không cạnh tranh bằng giá thành, IMS cạnh tranh bằng tầm nhìn. Thiết kế web tại IMS bạn sẽ được tư vấn hỗ trợ nhiệt tình. Tiếp cận sáng tạo công nghệ tiên phong và chất lượng quản lý hiệu quả. IMS sẽ làm bạn tự tin để thương hiệu bạn luôn tỏa sáng với mục tiêu doanh thu và mức độ nhận biết. Sở hữu công nghệ ứng dụng Smartphone (Responsive) cho ứng dụng website làm tăng hiệu quả thích ứng cho người sử dụng lướt web trên mọi hệ thống (Laptop, Dektop, Ipad, Mobile..).                
                Công ty thiết kế web IMS luôn quan niệm làm thương hiệu, danh tiếng của bạn trở nên lớn hơn và được xã hội tôn trọng. Hãy xem chúng tôi làm gì để tiếp cận doanh số, năng lực triển khai đội ngũ nhân sự trong nhiều năm qua và đó là những gì về IMS .',
                'logo' => 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-tnhh-giai-phap-ims-9faecad378b5816c074067653461e680-663c4494951fc.jpg',
                'image' => 'https://static.topcv.vn/company_covers/4b18067fc3ae2e88e0c5514f476ea948-6163e2a609f64.jpg',
                'latitude' => 10.811372, 
                'longitude' => 106.628735,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id' => 19,
                'user_id' => 19,
                'name' => 'CÔNG TY TNHH VI TÍNH NGUYÊN KIM',
                'address' => '245B Trần Quang Khải, Phường Tân Định, Quận 1, HCM',
                'min_employees' => 100,
                'max_employees' => 499,
                'contact_name' => 'Trần Hồng Ngọc',
                'phone' => '0333333333',
                'website' => 'http://www.vitinhnguyenkim.vn/',
                'description' => '“ Công ty vi tính Nguyên Kim cam kết đáp ứng tối đa yêu cầu của khách hàng bằng các giải pháp phù hợp và công nghệ tiên tiến nhất nhằm giúp khách hàng đạt được những giá trị tối ưu.”  ( Lê Nguyên Kim – GĐ Công ty TNHH Vi Tính Nguyên Kim).    Qua nhiều năm hoạt động trong lĩnh vực cung cấp công nghệ và thiết bị CNTT cho nhiều đơn vị trong cả nước với đội ngũ nhân viên công ty chuyên nghiệp, luôn cập nhật những thông tin công nghệ hiện đại nhất, giàu kinh nghiệm và nhiệt tình phục vụ khách hàng. Chúng tôi không chỉ cung cấp kịp thời cho khách hàng các sản phẩm công nghệ thông tin có chất lượng cao với giá hợp lý, mà còn cung cấp cho khách hàng những dịch vụ hậu mãi tin cậy, nhanh chóng. Làm thỏa mãn cả những khách hàng khó tính nhất nhằm đảm bảo mang đến cho khách hàng sự yên tâm trong suốt quá trình sử dụng.    
                Với phương châm “Khách hàng như người thân”, công ty vi tính Nguyên Kim luôn nỗ lực tạo dựng mối quan hệ tốt đẹp với khách hàng, không ngừng cải tiến và phát triển hoạt động kinh doanh của mình, cam kết mang đến cho khách hàng những sản phẩm, dịch vụ trước và sau bán hàng với chất lượng tốt nhất.    Tại Nguyên Kim các sản phẩm luôn được kiểm tra kỹ lưỡng từ đội ngũ chuyên viên kỹ thuật cao cấp của hãng, tổng đại lý và công ty Nguyên Kim trước khi đến tay người tiêu dùng. Vì vậy, quý khách hàng có thể hoàn toàn an tâm và tin tưởng vào chất lượng sản phẩm mà chúng tôi cung cấp.    Hơn nữa các sản phẩm đều được bảo hành, bảo trì theo tiêu chuẩn chính hãng với chất lượng tốt nhất và nhanh chóng nhất nhằm đảm bảo các thiết bị hoạt động ổn định trong suốt thời gian sử dụng, giúp khách hàng tiết kiệm thời gian và chi phí, nâng cao hiệu suất sử dụng.    Đặc biệt đến với Nguyên Kim quý khách hàng còn nhận được dịch vụ hỗ trợ (vận chuyển hàng, đổi trả hàng, bảo hành, bảo trì định kỳ miễn phí…), tư vấn tốt nhất bởi đội ngũ nhân viên nhiệt tình, có chuyên môn sâu, am hiểu rộng về lĩnh vực CNTT. Đó chính là điểm mạnh mà Công ty Nguyên Kim không ngừng xây dựng để phục vụ tốt nhất cho khách hàng.',
                'logo' => 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-tnhh-vi-tinh-nguyen-kim-5cf484e929aae.jpg',
                'image' => 'https://static.topcv.vn/company_covers/19mXopDYHfLSGlq2qv7h.jpg',
                'latitude' => 10.791298, 
                'longitude' => 106.688542,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id' => 20,
                'user_id' => 20,
                'name' => 'CÔNG TY TNHH TIN HỌC & DỊCH VỤ NAM LONG',
                'address' => '4a/167a đường D1, Phường 25, Bình Thạnh',
                'min_employees' => 10,
                'max_employees' => 24,
                'contact_name' => 'Trần Hồng Ngọc',
                'phone' => '0333333333',
                'website' => 'http://www.namlongsoft.com/',
                'description' => 'Nam Long hình thành từ đội ngũ trẻ trung và đang có những bước phát triển mạnh mẽ và chỗ đứng vững chắc trên thị trường. Chúng tôi luôn nỗ lực để xây dựng một đội ngũ thật sự chuyên nghiệp và một môi trường làm việc hiện đại, thân thiện, giàu tính sáng tạo. Hiện tại chúng tôi cần bổ sung thêm nhân sự để phục vụ kế hoạch mở rộng thị trường.',
                'logo' => 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/u37LAxAbz0R3FFKv8vs0RWG1yaaeFhqU_1681119480____8e61be1af0d26ee6ca720ecfc3574ffb.png',
                'image' => 'https://static.topcv.vn/company_covers/9Ik4XcKfn7t7T9L4pbXY.jpg',
                'latitude' => 10.803909, 
                'longitude' => 106.720066,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id' => 21,
                'user_id' => 21,
                'name' => 'Lampart',
                'address' => 'An Phú Plaza, 117-119 Lý Chính Thắng, Phường Võ Thị Sáu, Quận 3',
                'min_employees' => 100,
                'max_employees' => 499,
                'contact_name' => 'Trần Hồng Ngọc',
                'phone' => '0333333333',
                'website' => 'https://lampart-vn.com/',
                'description' => 'LAMPART, a software company established by Wakka Inc and located in Ho Chi Minh City since 2012.
                We are a family with over 120 members working together to contribute Lampart’s development. Now, to expand our business, we are looking for talent developers major in PHP, C#, ... with different frameworks to join in new large-scale projects from one of the biggest companies in Japan. With your skill and experience, we believe that we will provide to customers what we do best with motto:                
                “Bring the internationally acctaimed Japanese quality to Vietnam and bring Asian services to the worldwide”                
                We are pleasure bring to you a great opportunity to improve your skills and know-how, as well as being a part of our dynamic team to create a unique products.',
                'logo' => 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/lampart-5dfb420d79b42.jpg',
                'image' => null,
                'latitude' => 10.78734, 
                'longitude' => 106.68515,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id' => 22,
                'user_id' => 22,
                'name' => 'CÔNG TY CỔ PHẦN GIẢI PHÁP VÀ CÔNG NGHỆ VIETNIX',
                'address' => '265 Hồng Lạc, Phường 10, Quận Tân Bình, Thành phố Hồ Chí Minh, Việt Nam',
                'min_employees' => 25,
                'max_employees' => 99,
                'contact_name' => 'Trần Hồng Ngọc',
                'phone' => '0333333333',
                'website' => 'https://vietnix.vn/',
                'description' => 'Thành lập từ năm 2012, Vietnix đã trải qua gần 10 năm xây dựng và phát triển trong lĩnh vực Hosting. Vietnix là dịch vụ máy chủ đầu tiên tại Việt Nam tập trung phát triển công nghệ chống DDoS chuyên nghiệp.',
                'logo' => 'https://cdn-new.topcv.vn/unsafe/135x/https://static.topcv.vn/company_logos/cong-ty-co-phan-giai-phap-va-cong-nghe-vietnix-624e5b3f74427.jpg',
                'image' => 'https://static.topcv.vn/company_covers/eWpgMQYKbr6RvvNdKwMZ.jpg',
                'latitude' => 10.787655, 
                'longitude' => 106.645442,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id' => 23,
                'user_id' => 23,
                'name' => 'Công Ty TNHH LG CNS VIỆT NAM',
                'address' => 'toà nhà Youngjin E&C Hải Phòng, Hồng Phong, An Dương, Hải Phòng, Việt Nam',
                'min_employees' => 100,
                'max_employees' => 499,
                'contact_name' => 'Trần Hồng Ngọc',
                'phone' => '0333333333',
                'website' => 'https://careers.lgcnsvn.com/',
                'description' => 'Là Chuyên gia Chuyển đổi Kỹ thuật số (DX) và
                Đối tác tăng trưởng kỹ thuật số,                
                chúng tôi cống hiến các kỹ năng DX của mình để giúp các khách hàng lớn đạt được thành công.                
                LG CNS dẫn đầu công nghệ Cloud, AI/Big data,                
                smart factory, smart logistics, smart city, blockchain,                
                và các công nghệ chuyển đổi số khác',
                'logo' => 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/TookgFfkXGVGSlPM3ZImR07Uz4UDNz5U_1681297674____f10a3ab84434a4d2e12e0e24b30090ba.png',
                'image' => 'https://static.topcv.vn/company_covers/cong-ty-tnhh-lg-cns-viet-nam-abd4aac9f1a620d950e6125156cbcb50-642fb41dead51.jpg',
                'latitude' => 20.85677, 
                'longitude' => 106.58339,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id' => 24,
                'user_id' => 24,
                'name' => 'Công ty TNHH Linagora',
                'address' => 'Tầng 4 tòa nhà Viet Tower số 1 Thái Hà, Đống Đa, Hanoi',
                'min_employees' => 100,
                'max_employees' => 499,
                'contact_name' => 'Trần Hồng Ngọc',
                'phone' => '0333333333',
                'website' => 'http://linagora.vn/?fbclid=IwAR0FqdTXaalqNpLRx1QYv5a9lOHs6_-ZILXxW5tUIVidAOsXVa1aEG1RRxU',
                'description' => 'LINAGORA tập đoàn hàng đầu trong lĩnh vực mã nguồn mở tại Pháp.
                LINAGORA là tập đoàn số một của Pháp hoạt động trong lĩnh vực Phần mềm Nguồn mở và hiện tại công ty chúng tôi đang dẫn đầu tại thị trường Pháp về giải pháp nguồn mở. Với hơn 150 chuyên gia và có trụ sở tại Pháp, Canada, Tunisie và Việt Nam.                
                LINAGORA vừa là công ty sản xuất các phần mềm mã nguồn mở, vừa là nhà cung cấp các dịch vụ như tư vấn công nghệ, triển khai, hỗ trợ, bảo trì, đào tạo.... trong các dự án lớn về mã nguồn mở.                
                Lĩnh vực sản xuất phần mềm mã nguồn mở của chúng tôi dựa trên 4 giải pháp:                
                OBM: Giải pháp email và phần mềm làm việc theo nhóm groupware.                
                LinPKI: Giải pháp bảo mật.                
                LinID: Ứng dụng quản lý truy cập và đồng bộ hóa định danh.                
                LinSM: Giải pháp quản lý trong các tổ chức, công ty.',
                'logo' => 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/44fa89723c18afc263391817c19a2d53-5da58cd2b3324.jpg',
                'image' => 'https://static.topcv.vn/company_covers/cong-ty-tnhh-linagora-69b50272440e03fb183c045ce8c4b2f8-5da65e7fac7c9.jpg',
                'latitude' => 21.009231, 
                'longitude' => 105.823711,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id' => 25,
                'user_id' => 25,
                'name' => 'CÔNG TY CỔ PHẦN TECHBANK SOFTWARE',
                'address' => 'tầng 3, tòa nhà Tân Hồng Hà, 317 Trường Chinh, Quận Thanh Xuân, Hà nội',
                'min_employees' => 25,
                'max_employees' => 99,
                'contact_name' => 'Trần Hồng Ngọc',
                'phone' => '0333333333',
                'website' => 'https://techbank.com.vn/',
                'description' => 'Techbank Software là công ty công nghệ chuyên cung cấp dịch vụ phát triển phần mềm đối tác nước ngoài hoặc tại Việt Nam như, Offshore Development, Offshore BOT, IT Engineers Staff và các dịch vụ khác. Techbank hoạt động trong lĩnh vực gia công phần mềm ( IT outsourcing) cho thị trường Nhật Bản và Âu Mỹ.

                Được thành lập vào năm 2019, chúng tôi đã nhanh chóng khẳng định mình là một công ty công nghệ hàng đầu tại Việt Nam, đồng thời nổi tiếng là nhà cung cấp giải pháp CNTT hiệu quả và đáng tin cậy. 
                
                Techbank được thành lập bởi đội ngũ các nhà công nghệ hàng đầu và các doanh nhân giàu kinh nghiệm đến từ Việt Nam, những người đã từng thành lập 11 công ty trong sự nghiệp trước khi thành lập Techbank, công ty là nơi hội tụ sức mạnh của sức mạnh công nghệ như tên gọi của nó, ngân hàng của công nghệ, đổi mới và sáng tạo, ý tưởng.
                
                Chúng tôi đang tìm kiếm các bạn trẻ tài năng, khát vọng, nhiệt huyết và có tầm nhìn dài hạn để đồng hành trong hành trình sắp tới với Techbank Software.
                
                Công ty có văn phòng tại Hà Nội và Nhật bản, được sáng lập nên bởi những thành viên có nhiều năm kinh nghiệm trong lĩnh vực công nghệ và phát triển phần mềm.',
                'logo' => 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/i9qRfjKshFJr04pn62ZA7DKtM5X2aqFg_1708573231____7358bba866d9c409e015562a4cf36871.jpg',
                'image' => null,
                'latitude' => 20.999533, 
                'longitude' => 105.831645,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id' => 26,
                'user_id' => 26,
                'name' => 'Mona Media',
                'address' => '1073/23 Cách Mạng Tháng 8, Phường 7, Q. Tân Bình, HCM',
                'min_employees' => 100,
                'max_employees' => 499,
                'contact_name' => 'Trần Hồng Ngọc',
                'phone' => '0333333333',
                'website' => 'https://mona.media/',
                'description' => 'Mona Media là công ty thiết kế website cao cấp có tuổi đời 8+ năm trong ngành, hoạt động chính thức từ 2013 – trước đó là một nhóm Freelancer.

                Mona Media hoạt động chính trong các mảng:
                
                Website cao cấp cho khách hàng, giao diện thiết kế độc quyền, chỉn chu, chuẩn về UX, tính năng code theo giải pháp đã tư vấn cho khách hàng.
                
                Web-app, phần mềm quản lý viết riêng, giải quyết các vấn đề tồn đọng và vấn đề tương lai phát triển cho doanh nghiệp
                
                Là sân sau hỗ trợ các đối tác cùng ngành thiết kế website và phần mềm khác nhờ vào đội ngũ lập trình và thiết kế chuyên môn cao, chúng tôi đã hỗ trợ các anh em đồng nghiệp khác trong nghề đưa dự án tới tay khách hàng
                
                SEO và Marketing online cho các dự án khách hàng của chính công ty
                
                Nghiên cứu và ra đời các bộ phần mềm có sẵn để phục vụ trực tiếp vào nhu cầu của khách hàng Việt Nam như phần mềm nhập hàng Trung Quốc, phần mềm dạy học trực tuyến elearning, phần mềm quản lý tiệm nail, tóc, làm đẹp,
                
                Ngay từ những ngày đầu hoạt động, Mona Media đã chọn cho mình một phân khúc riêng, khác biệt với hàng ngàn công ty dịch vụ thiết kế website trên thị trường: phân khúc của sự hiệu quả.
                
                Những website/phần mềm từ Mona Media luôn được tư vấn, phát triển, tối ưu nhằm mang lại hiệu quả rõ rệt cho hoạt động kinh doanh của doanh nghiệp.',
                'logo' => 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/mona-media-60da9257f3eca.jpg',
                'image' => null,
                'latitude' => 10.790966, 
                'longitude' => 106.656124,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id' => 27,
                'user_id' => 27,
                'name' => 'CÔNG TY CỔ PHẦN EDUVATOR',
                'address' => 'Số nhà 65, phố Yên Lãng, Phường Trung Liệt, Quận Đống Đa, Thành phố Hà Nội, Việt Nam',
                'min_employees' => 100,
                'max_employees' => 499,
                'contact_name' => 'Trần Hồng Ngọc',
                'phone' => '0333333333',
                'website' => 'https://zim.vn/',
                'description' => 'Công ty Cổ phần Eduvator được thành lập vào tháng 9/2015 với mục tiêu giúp con người tự khám phá tiềm năng của chính mình. Dự án đầu tiên của Eduvator là Hệ thống Trung tâm Anh Ngữ ZIM, nhằm cung cấp giải pháp học tập tối ưu cho từng cá nhân.

                Eduvator là sự kết hợp giữa "Education" (Giáo dục) và "Innovator" (Người sáng tạo), với sứ mệnh mang đến "A Better Education" (Một nền giáo dục tốt hơn) cho mỗi cá nhân, giúp họ khai phá tiềm năng bản thân. ZIM, như một phần của Eduvator, đồng hành và trang bị cho mỗi cá nhân phương pháp học tối ưu để thích nghi và phát triển trong một thế giới không ngừng thay đổi.
                
                Khác với phần lớn trung tâm Anh ngữ khác tại Việt Nam, ZIM đặc biệt chú trọng vào nghiên cứu và phát triển (R&D), là yếu tố quan trọng xây dựng uy tín của trung tâm. Bên cạnh việc nghiên cứu, sản xuất và không ngừng cải tiến giáo án và tài liệu cho các chương trình đào tạo, ZIM đầu tư vào việc xuất bản sách, phát triển bài đánh giá năng lực tiếng Anh, viết bài học học thuật và nhiều hoạt động khác. ZIM cũng là đơn vị duy nhất tại Việt Nam sản xuất đề thi IELTS và TOEIC, cũng như tổ chức các kỳ thi thử chuẩn trước khi thi thật. Các kỳ thi thử này do ZIM tổ chức giúp đánh giá chính xác năng lực và đáng tin cậy trong việc lựa chọn trước khi tham gia kỳ thi chính thức.',
                'logo' => 'https://cdn-new.topcv.vn/unsafe/135x/https://static.topcv.vn/company_logos/cong-ty-co-phan-eduvator-64213c06f3c25.jpg',
                'image' => 'https://static.topcv.vn/company_covers/Uco28gZMqQ2swBSCCyHU.jpg',
                'latitude' => 21.010369, 
                'longitude' => 105.815518,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id' => 28,
                'user_id' => 28,
                'name' => 'Unit Corp',
                'address' => 'Floor 5-6-7-8-9-10 - Nikko Building, 374 Vo Van Tan Street, Ward 5, District 3, HCMC, Vietnam',
                'min_employees' => 100,
                'max_employees' => 499,
                'contact_name' => 'Trần Hồng Ngọc',
                'phone' => '0333333333',
                'website' => 'https://www.unit.com.vn/',
                'description' => 'UNIT - Nơi hội tụ sáng tạo
                - Với sứ mệnh tạo ra các sản phẩm công nghệ vượt trội nhằm phục vụ khách hàng, UNIT khẳng định vị thế của mình bằng đội ngũ các thành viên có trình độ chuyên môn cao kết hợp với sự sáng tạo và đột phá trong tư duy để tạo ra những giải pháp tối ưu.
                
                - Được thành lập từ tháng 3 năm 2010, UNIT là Công ty công nghệ chuyên cung cấp các Giải pháp và Sản phẩm phần mềm trong lĩnh vực Tài chính, Ngân Hàng, Bảo hiểm và Quản trị có uy tín tại thị trường Việt Nam và Quốc tế. Chúng tôi luôn lắng nghe ý kiến của khách hàng, nhu cầu của thị trường, nghiên cứu các công nghệ mới để đem đến cho khách hàng những sản phẩm đầy trải nghiệm.
                
                - Là Công ty chuyên cung cấp giải pháp phần mềm tài chính có uy tín trong và ngoài nước chúng tôi đã triển khai thành công rất nhiều dự án trong ngành như: Ngân hàng, Quỹ đầu tư, Bảo hiểm, các Công ty tài chính…
                
                - Với môi trường làm việc năng động và chuyên nghiệp, UNIT Corp mong chào đón ứng viên có khả năng và lòng nhiệt huyết để cùng Công ty chúng tôi phát triển. ',
                'logo' => 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/vBWMEGncsF00niBOQ9DkEO1kW3Ij5Ut1_1664778366____f7cdac52bd7fa9b167eb833f4729dc29.png',
                'image' => 'https://static.topcv.vn/company_covers/TIHG4gReMTvLZps8936k.jpg',
                'latitude' => 10.770592, 
                'longitude' => 106.684486,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            // [
            //     'id' => ,
            //     'user_id' => ,
            //     'name' => '',
            //     'address' => '',
            //     'min_employees' => 25,
            //     'max_employees' => 99,
            //     'contact_name' => 'Trần Hồng Ngọc',
            //     'phone' => '0333333333',
            //     'website' => '',
            //     'description' => '',
            //     'logo' => '',
            //     'image' => '',
            //     'latitude' => , 
            //     'longitude' => ,
            //     'created_at' => Carbon::now(),
            //     'updated_at' => Carbon::now()
            // ],
            // [
            //     'id' => ,
            //     'user_id' => ,
            //     'name' => '',
            //     'address' => '',
            //     'min_employees' => 25,
            //     'max_employees' => 99,
            //     'contact_name' => 'Trần Hồng Ngọc',
            //     'phone' => '0333333333',
            //     'website' => '',
            //     'description' => '',
            //     'logo' => '',
            //     'image' => '',
            //     'latitude' => , 
            //     'longitude' => ,
            //     'created_at' => Carbon::now(),
            //     'updated_at' => Carbon::now()
            // ],
            // [
            //     'id' => ,
            //     'user_id' => ,
            //     'name' => '',
            //     'address' => '',
            //     'min_employees' => 25,
            //     'max_employees' => 99,
            //     'contact_name' => 'Trần Hồng Ngọc',
            //     'phone' => '0333333333',
            //     'website' => '',
            //     'description' => '',
            //     'logo' => '',
            //     'image' => '',
            //     'latitude' => , 
            //     'longitude' => ,
            //     'created_at' => Carbon::now(),
            //     'updated_at' => Carbon::now()
            // ],
            // [
            //     'id' => ,
            //     'user_id' => ,
            //     'name' => '',
            //     'address' => '',
            //     'min_employees' => 25,
            //     'max_employees' => 99,
            //     'contact_name' => 'Trần Hồng Ngọc',
            //     'phone' => '0333333333',
            //     'website' => '',
            //     'description' => '',
            //     'logo' => '',
            //     'image' => '',
            //     'latitude' => , 
            //     'longitude' => ,
            //     'created_at' => Carbon::now(),
            //     'updated_at' => Carbon::now()
            // ],
            // [
            //     'id' => ,
            //     'user_id' => ,
            //     'name' => '',
            //     'address' => '',
            //     'min_employees' => 25,
            //     'max_employees' => 99,
            //     'contact_name' => 'Trần Hồng Ngọc',
            //     'phone' => '0333333333',
            //     'website' => '',
            //     'description' => '',
            //     'logo' => '',
            //     'image' => '',
            //     'latitude' => , 
            //     'longitude' => ,
            //     'created_at' => Carbon::now(),
            //     'updated_at' => Carbon::now()
            // ],
            // [
            //     'id' => ,
            //     'user_id' => ,
            //     'name' => '',
            //     'address' => '',
            //     'min_employees' => 25,
            //     'max_employees' => 99,
            //     'contact_name' => 'Trần Hồng Ngọc',
            //     'phone' => '0333333333',
            //     'website' => '',
            //     'description' => '',
            //     'logo' => '',
            //     'image' => '',
            //     'latitude' => , 
            //     'longitude' => ,
            //     'created_at' => Carbon::now(),
            //     'updated_at' => Carbon::now()
            // ],
            // [
            //     'id' => ,
            //     'user_id' => ,
            //     'name' => '',
            //     'address' => '',
            //     'min_employees' => 25,
            //     'max_employees' => 99,
            //     'contact_name' => 'Trần Hồng Ngọc',
            //     'phone' => '0333333333',
            //     'website' => '',
            //     'description' => '',
            //     'logo' => '',
            //     'image' => '',
            //     'latitude' => , 
            //     'longitude' => ,
            //     'created_at' => Carbon::now(),
            //     'updated_at' => Carbon::now()
            // ],
            // [
            //     'id' => ,
            //     'user_id' => ,
            //     'name' => '',
            //     'address' => '',
            //     'min_employees' => 25,
            //     'max_employees' => 99,
            //     'contact_name' => 'Trần Hồng Ngọc',
            //     'phone' => '0333333333',
            //     'website' => '',
            //     'description' => '',
            //     'logo' => '',
            //     'image' => '',
            //     'latitude' => , 
            //     'longitude' => ,
            //     'created_at' => Carbon::now(),
            //     'updated_at' => Carbon::now()
            // ],
            // [
            //     'id' => ,
            //     'user_id' => ,
            //     'name' => '',
            //     'address' => '',
            //     'min_employees' => 25,
            //     'max_employees' => 99,
            //     'contact_name' => 'Trần Hồng Ngọc',
            //     'phone' => '0333333333',
            //     'website' => '',
            //     'description' => '',
            //     'logo' => '',
            //     'image' => '',
            //     'latitude' => , 
            //     'longitude' => ,
            //     'created_at' => Carbon::now(),
            //     'updated_at' => Carbon::now()
            // ],
            // [
            //     'id' => ,
            //     'user_id' => ,
            //     'name' => '',
            //     'address' => '',
            //     'min_employees' => 25,
            //     'max_employees' => 99,
            //     'contact_name' => 'Trần Hồng Ngọc',
            //     'phone' => '0333333333',
            //     'website' => '',
            //     'description' => '',
            //     'logo' => '',
            //     'image' => '',
            //     'latitude' => , 
            //     'longitude' => ,
            //     'created_at' => Carbon::now(),
            //     'updated_at' => Carbon::now()
            // ],
            // [
            //     'id' => ,
            //     'user_id' => ,
            //     'name' => '',
            //     'address' => '',
            //     'min_employees' => 25,
            //     'max_employees' => 99,
            //     'contact_name' => 'Trần Hồng Ngọc',
            //     'phone' => '0333333333',
            //     'website' => '',
            //     'description' => '',
            //     'logo' => '',
            //     'image' => '',
            //     'latitude' => , 
            //     'longitude' => ,
            //     'created_at' => Carbon::now(),
            //     'updated_at' => Carbon::now()
            // ],
            // [
            //     'id' => ,
            //     'user_id' => ,
            //     'name' => '',
            //     'address' => '',
            //     'min_employees' => 25,
            //     'max_employees' => 99,
            //     'contact_name' => 'Trần Hồng Ngọc',
            //     'phone' => '0333333333',
            //     'website' => '',
            //     'description' => '',
            //     'logo' => '',
            //     'image' => '',
            //     'latitude' => , 
            //     'longitude' => ,
            //     'created_at' => Carbon::now(),
            //     'updated_at' => Carbon::now()
            // ],
            // [
            //     'id' => ,
            //     'user_id' => ,
            //     'name' => '',
            //     'address' => '',
            //     'min_employees' => 25,
            //     'max_employees' => 99,
            //     'contact_name' => 'Trần Hồng Ngọc',
            //     'phone' => '0333333333',
            //     'website' => '',
            //     'description' => '',
            //     'logo' => '',
            //     'image' => '',
            //     'latitude' => , 
            //     'longitude' => ,
            //     'created_at' => Carbon::now(),
            //     'updated_at' => Carbon::now()
            // ],
            // [
            //     'id' => ,
            //     'user_id' => ,
            //     'name' => '',
            //     'address' => '',
            //     'min_employees' => 25,
            //     'max_employees' => 99,
            //     'contact_name' => 'Trần Hồng Ngọc',
            //     'phone' => '0333333333',
            //     'website' => '',
            //     'description' => '',
            //     'logo' => '',
            //     'image' => '',
            //     'latitude' => , 
            //     'longitude' => ,
            //     'created_at' => Carbon::now(),
            //     'updated_at' => Carbon::now()
            // ],
        ]);
    }
}
