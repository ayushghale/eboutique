import React from "react";

export default function SignInFour() {
  return (
    <div class="flex items-center justify-center h-screen">
      <section class="flex flex-col items-center justify-center">
        <div class="flex items-center justify-center border-2 border-gray w-[400px] rounded-md  px-4 py-10 sm:px-6 sm:py-10 lg:px-8">
          <div class="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <div class="mb-2">
              <img src="logo.png" alt="" />
            </div>
            <h2 class="text-3xl font-bold leading-tight text-black  flex justify-center">
              Sign
            </h2>

            <div class="mt-8">
              <div class="space-y-5">
                <div>
                  <label for="" class="text-base font-medium ">
                    Email address
                  </label>
                  <div class="mt-2">
                    <input
                      class="flex h-10 w-full rounded-md border  bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:border-gray border-gray  focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                    ></input>
                  </div>
                </div>
                <div>
                  <div class="flex items-center justify-between">
                    <label for="" class="text-base font-medium ">
                      Password
                    </label>
                  </div>
                  <div class="mt-2">
                    <input
                      class="flex h-10 w-full rounded-md border  bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:border-gray  border-gray focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                    ></input>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    class="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
