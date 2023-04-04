import { useRouter } from "next/router";

export default function IpPage(props) {

  const params = props.params || null
  console.log("Ip params", props)

  const router = useRouter();
  const { ip } = router.query;

  return (
    <div
      className="flex flex-col  h-screen justify-center items-center bg-gradient-to-t from-aqua/90 to-aqua/20"
    >
      <h1>Ip Page</h1>
      <div className="flex flex-col justify-center items-center text-xl mt-20 text-purple-800 font-bold text-center">
        {router.query && Object.keys(router.query).map((key) => {
          return (
            <div key={key}>
              <h1>{key}</h1>
              <p>{router.query[key]}</p>
            </div>
          );

        }
        )}
      </div>
    </div>
  );
}


// export async function getStaticProps(context) {
//   const { params } = context;
//   console.log("Ip context", context)
//   return {
//     props: {
//       params,
//     },
//   };
// }