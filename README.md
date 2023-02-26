# 2D-Web-Based-CAD

> Disusun untuk memenuhi Tugas 1 IF3260 Grafika Komputer 2D Web Based CAD (Computer-Aided Design)

## Daftar Isi

- [Deskripsi Singkat](#deskripsi-singkat)
- [Struktur Program](#struktur-program)
- [Fitur Program](#fitur-program)
- [Cara Instalasi Program](#cara-instalasi-program)
- [Cara Menjalankan Program](#cara-menjalankan-program)

## Deskripsi Singkat

WebGL merupakan kakas dengan spesialisasi pada ranah grafika yang dapat dengan mudah diintegrasikan pada web. Dengan menggunakan WebGL, kita dapat mengimplementasikan web dengan fitur menggambar, mengedit, dan memvisualisasi sejumlah model pada kanvas HTML. Selain itu, WebGL juga mengutilitasikan GPU untuk melakukan rendering dan transformasi geometri. Oleh karena itu, aplikasi 2D Web Based CAD menggunakan WebGL sebagai tools untuk memodelkan berbagai bentuk geometri.

## Struktur Program

```
.
├── README.md
├── nodemon.json
├── package.json
├── public
│   ├── dist
│   │   └── index.js
│   ├── images
│   │   └── logo.svg
│   ├── index.html
│   └── styles
│       └── index.css
├── shapes
│   ├── colorful_triangle.json
│   └── so_many_squares.json
├── src
│   ├── Algorithms
│   │   └── convex-hull.ts
│   ├── Factories
│   │   ├── Objects
│   │   │   ├── line-factory.ts
│   │   │   ├── polygon-factory.ts
│   │   │   ├── rectangle-factory.ts
│   │   │   ├── shape-factory.ts
│   │   │   └── square-factory.ts
│   │   └── Operations
│   │       └── point-factory.ts
│   ├── Files
│   │   ├── file-handling.ts
│   │   └── file-system.ts
│   ├── Interfaces
│   │   ├── Objects
│   │   │   ├── line-interface.ts
│   │   │   ├── polygon-interface.ts
│   │   │   ├── rectangle-interface.ts
│   │   │   ├── shape-interface.ts
│   │   │   └── square-interface.ts
│   │   └── Operations
│   │       ├── coordinate-interface.ts
│   │       ├── matrix-interface.ts
│   │       ├── point-interface.ts
│   │       └── vector-interface.ts
│   ├── Objects
│   │   ├── line.ts
│   │   ├── polygon.ts
│   │   ├── rectangle.ts
│   │   ├── shape.ts
│   │   ├── square.ts
│   │   └── types.ts
│   ├── Operations
│   │   ├── coordinate.ts
│   │   ├── matrix.ts
│   │   ├── point.ts
│   │   ├── transformation.ts
│   │   └── vector.ts
│   ├── Utils
│   │   ├── program.ts
│   │   ├── resize-canvas.ts
│   │   ├── shader.ts
│   │   └── tools.ts
│   └── index.ts
├── tsconfig.json
├── webpack.config.js
└── yarn.lock
```

## Fitur Program

1. Pemodelan Garis
2. Pemodelan Persegi
3. Pemodelan Persegi Panjang
4. Pemodelan Poligon
5. Transformasi Geometri
6. Pewarnaan Vertex
7. Simpan / Unggah Model

## Cara Instalasi Program

1. Lakukan `git clone` terhadap repository ini
2. Jalankan perintah `yarn install` pada terminal untuk menginstalasi _library_ pendukung bahasa TypeScript

## Cara Menjalankan Program

1. Jalankan perintah `yarn nodemon` untuk menjalankan kompilasi secara _hot reload_
2. Buka file `./public/index.html` pada browser
3. Dapat diakses pada pranala berikut [ini](https://rayhankinan.github.io/2D-Web-Based-CAD/public/)
