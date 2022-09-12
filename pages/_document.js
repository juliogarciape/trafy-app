import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {

    render() {
    
    return (
    
    <Html lang="es-PE">
        <Head>
            <meta name="theme-color" content="#121f3d"/>
            <meta name="apple-mobile-web-app-capable" content="yes"/>
            <meta name="mobile-web-app-capable" content="yes"/>
            <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
            <meta charSet="UTF-8"/>
            <meta name="format-detection" content="telephone=no"/>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1"/>
            <meta name="referrer" content="no-referrer-when-downgrade"/>
            <meta property="og:locale" content="es_PE"/>
            <meta property="og:locale:alternate" content="es"/>
            <meta property="og:locale:alternate" content="en"/>
            <meta property="og:image:width" content="1280"/>
            <meta property="og:image:height" content="720"/>
            <meta property="og:image:type" content="image/jpeg"/>
            <meta property="og:image:alt" content="Trafy Shop plataforma ideal para emprendedores"/>
            <meta property="og:image" content="/favicons/thumb.jpg"/>
            <meta property="og:image:secure_url" content="/favicons/thumb.jpg"/>
            <meta property="og:type" content="website"/>
            <meta name="robots" content="noimageindex"/>
            <meta name="msapplication-TileImage" content="/favicons/icon-144x144.png"/>
            <meta name="msapplication-TileColor" content="#fff"/>
            <link rel="apple-touch-icon" type="image/png" href="/favicons/icon-192x192.png"/>
            <link rel="apple-touch-icon" type="image/png" sizes="60x60" href="/favicons/icon-60x60.png"/>
            <link rel="apple-touch-icon" type="image/png" sizes="76x76" href="/favicons/icon-76x76.png"/>
            <link rel="apple-touch-icon" type="image/png" sizes="120x120" href="/favicons/icon-120x120.png"/>
            <link rel="apple-touch-icon" type="image/png" sizes="144x144" href="/favicons/icon-144x144.png"/>
            <link rel="apple-touch-icon" type="image/png" sizes="152x152" href="/favicons/icon-152x152.png"/>
            <link rel="apple-touch-icon" type="image/png" sizes="180x180" href="/favicons/icon-180x180.png"/>
            <link rel="shortcut icon" href="/favicons/icon-192x192.ico" type="image/x-icon"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicons/icon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="76x76" href="/favicons/icon-76x76.png"/>
            <link rel="ion" type="image/png" size="96x96" href="/favicons/icon-96x96.png"/>
            <link rel="icon" type="image/png" sizes="120x120" href="/favicons/icon-120x120.png"/>
            <link rel="icon" type="image/png" sizes="152x152" href="/favicons/icon-152x152.png"/>
            <link rel="icon" type="image/png" sizes="192x192" href="/favicons/icon-192x192.png"/>
            <link rel="icon" type="image/png" sizes="256x256" href="/favicons/icon-256x256.png"/>
            <link rel="icon" type="image/png" sizes="512x512" href="/favicons/icon-512x512.png"/>
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
    
    )

    }
}

export default MyDocument