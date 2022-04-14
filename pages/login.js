import tw from "tailwind-styled-components";
import { getProviders, getSession, signIn } from "next-auth/react";

function login({ providers }) {
  return (
    <Wrapper>
      <div>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            {/* <button
          className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
          onClick={() => signIn(provider.id, { callbackUrl: "/" })}
        >
          <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1d9bf0] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
          <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
            Sign in with {provider.name}
          </span>
        </button> */}
            <a
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              href="#_"
              className="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100  shadow-inner group"
            >
              <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
              <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
              <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
              <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
              <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
              <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
                Sign in with {provider.name}
              </span>
            </a>
          </div>
        ))}
      </div>
    </Wrapper>
  );
}

export default login;

const Wrapper = tw.div`
pt-48
flex
flex-col
items-center
`;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const session = await getSession(context);

  return { props: { session, providers } };
}
