// SPA (single page aplication)
// SSR (server-side render)
//SSG (static-side generation)

export default function Home(props) {

  //Para SPAs é utilizado o hoock useEffect.

  // Anatomia
  // useEffect(()=> {}, ["variavel_a_ser_monitorada"])

  // useEffect(()=> {
  //   fetch("https://localhost:3333/episodes")
  // .then( res => res.json())
  // .then( data => console.log(data))
  // }, [])

  return (
    <h1>Index</h1>
  )
}

//Para SSR executamos primeiro esta fuançao para "setarmos" as props do nosso componente (sera executado toda vez que alguem acessar a nossa home)
// export async function getServerSideProps() {
//   const res = await fetch("https://localhost:3333/episodes")
//   const data = await res.json()
//   return {
//     props: {
//       episodes: data,
//     }
//   }

//}


// PAra SSG a cada 8 horas (neste caso) vai fazer uma requisiçao e gerar um html estatico que vai ser servido para todas as pessoas que acessarem
export async function getStaticProps() {
  const res = await fetch("https://localhost:3333/episodes")
  const data = await res.json()
  return {
    props: {
      episodes: data,
      
    },
    revalidate: 60 *60 * 8 // de 8 em 8 horas
  }

}
