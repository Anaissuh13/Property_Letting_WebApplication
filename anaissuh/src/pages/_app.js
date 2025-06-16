import 'bootstrap/dist/css/bootstrap.min.css' //Bootstrap styles
import '../styles/globals.css'
import Header      from '../components/Header'

export default function MyApp({Component,pageProps}) {
  return (
    // full‐height flex container
    <div className="app-container">
      <Header />
      {/* main grows to fill space */}
      <main className="app-main">
        <Component {...pageProps} />
      </main>
    </div>
  )
}