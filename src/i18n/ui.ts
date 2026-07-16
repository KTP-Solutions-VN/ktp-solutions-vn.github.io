export const languages = {
  vi: 'Tiếng Việt',
  en: 'English',
} as const;

export const defaultLang = 'vi';

export type Lang = keyof typeof languages;

export const ui = {
  vi: {
    'site.name': 'KTP Solutions',
    'site.description':
      'KTP Solutions — đối tác chuyển đổi số toàn diện: phát triển phần mềm, thiết kế website, truyền thông số và thiết kế thương hiệu cho doanh nghiệp Việt Nam.',
    'site.keywords':
      'KTP Solutions, công ty phần mềm, phát triển phần mềm, thiết kế website, thiết kế web chuyên nghiệp, giải pháp phần mềm, digital marketing, truyền thông số, thiết kế thương hiệu, nhận diện thương hiệu, chuyển đổi số, công ty công nghệ, giải pháp công nghệ, phát triển ứng dụng, thiết kế web Việt Nam',

    'nav.services': 'Dịch vụ',
    'nav.about': 'Về chúng tôi',
    'nav.contact': 'Liên hệ',

    'hero.tagline': 'Giải pháp công nghệ, nâng tầm doanh nghiệp',
    'hero.title': 'Đối tác chuyển đổi số toàn diện cho doanh nghiệp của bạn',
    'hero.subtitle':
      'Chúng tôi cung cấp giải pháp phát triển phần mềm, thiết kế website, truyền thông số và thiết kế thương hiệu — giúp doanh nghiệp vận hành hiệu quả và bứt phá trên môi trường số.',
    'hero.cta': 'Liên hệ ngay',
    'hero.cta2': 'Xem dịch vụ',

    'services.title': 'Dịch vụ của chúng tôi',
    'services.subtitle': 'Giải pháp toàn diện từ ý tưởng đến vận hành',
    'services.software.title': 'Phát triển phần mềm',
    'services.software.desc':
      'Xây dựng ứng dụng web, mobile và hệ thống quản lý theo yêu cầu, tối ưu cho quy trình vận hành của doanh nghiệp.',
    'services.web.title': 'Thiết kế & phát triển Web',
    'services.web.desc':
      'Website chuyên nghiệp, chuẩn SEO, tốc độ cao và responsive trên mọi thiết bị.',
    'services.media.title': 'Truyền thông số',
    'services.media.desc':
      'Chiến lược digital marketing, quản lý mạng xã hội và sản xuất nội dung giúp thương hiệu tiếp cận đúng khách hàng.',
    'services.design.title': 'Thiết kế thương hiệu',
    'services.design.desc':
      'Nhận diện thương hiệu, logo và ấn phẩm thiết kế nhất quán, chuyên nghiệp và khác biệt.',

    'about.title': 'Về KTP Solutions',
    'about.body':
      'KTP Solutions là đội ngũ chuyên gia công nghệ và sáng tạo tại Việt Nam. Chúng tôi đồng hành cùng doanh nghiệp trên hành trình chuyển đổi số — từ tư vấn, thiết kế đến phát triển và vận hành. Sứ mệnh của chúng tôi là biến công nghệ thành lợi thế cạnh tranh thực sự cho khách hàng.',
    'about.stat1.num': '100%',
    'about.stat1.label': 'Cam kết chất lượng',
    'about.stat2.num': '24/7',
    'about.stat2.label': 'Hỗ trợ tận tâm',
    'about.stat3.num': '360°',
    'about.stat3.label': 'Giải pháp toàn diện',

    'contact.title': 'Liên hệ với chúng tôi',
    'contact.subtitle':
      'Sẵn sàng bắt đầu dự án của bạn? Hãy gửi cho chúng tôi vài dòng.',
    'contact.email.label': 'Email',
    'contact.form.name': 'Họ và tên',
    'contact.form.email': 'Email của bạn',
    'contact.form.message': 'Nội dung',
    'contact.form.send': 'Gửi liên hệ',

    'footer.rights': 'All rights reserved.',
    'footer.tagline': 'Giải pháp công nghệ, nâng tầm doanh nghiệp.',
  },
  en: {
    'site.name': 'KTP Solutions',
    'site.description':
      'KTP Solutions — your full-service digital transformation partner: software development, web design, digital media and brand design for businesses in Vietnam.',
    'site.keywords':
      'KTP Solutions, software development company, custom software, web design, web development, professional website, software solutions, digital marketing, digital media, brand design, brand identity, digital transformation, technology company Vietnam, app development',

    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.contact': 'Contact',

    'hero.tagline': 'Technology solutions that elevate your business',
    'hero.title': 'Your full-service digital transformation partner',
    'hero.subtitle':
      'We deliver software development, web design, digital media and brand design — helping businesses operate efficiently and thrive in the digital world.',
    'hero.cta': 'Get in touch',
    'hero.cta2': 'Our services',

    'services.title': 'Our Services',
    'services.subtitle': 'End-to-end solutions from idea to operation',
    'services.software.title': 'Software Development',
    'services.software.desc':
      'Custom web apps, mobile apps and management systems built to fit and optimize your business processes.',
    'services.web.title': 'Web Design & Development',
    'services.web.desc':
      'Professional, SEO-friendly, high-performance websites that are responsive on every device.',
    'services.media.title': 'Digital Media',
    'services.media.desc':
      'Digital marketing strategy, social media management and content production to reach the right customers.',
    'services.design.title': 'Brand Design',
    'services.design.desc':
      'Consistent, professional and distinctive brand identity, logo and design collateral.',

    'about.title': 'About KTP Solutions',
    'about.body':
      'KTP Solutions is a team of technology and creative experts based in Vietnam. We partner with businesses throughout their digital transformation journey — from consulting and design to development and operations. Our mission is to turn technology into a real competitive advantage for our clients.',
    'about.stat1.num': '100%',
    'about.stat1.label': 'Quality commitment',
    'about.stat2.num': '24/7',
    'about.stat2.label': 'Dedicated support',
    'about.stat3.num': '360°',
    'about.stat3.label': 'End-to-end solutions',

    'contact.title': 'Contact Us',
    'contact.subtitle': 'Ready to start your project? Drop us a line.',
    'contact.email.label': 'Email',
    'contact.form.name': 'Full name',
    'contact.form.email': 'Your email',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send message',

    'footer.rights': 'All rights reserved.',
    'footer.tagline': 'Technology solutions that elevate your business.',
  },
} as const;
