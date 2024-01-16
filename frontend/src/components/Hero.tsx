import React from 'react'

export const Hero = () => {
  return (
        <section
  className="relative bg-[url(https://images.unsplash.com/photo-1464082354059-27db6ce50048?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center  bg-no-repeat"
>
  <div className="absolute inset-0 bg-white/65 sm:bg-transparent sm:from-white/85 sm:to-white/25 sm:bg-gradient-to-r"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:px-8">
        <div className="max-w-xl text-center sm:text-left">
          <h1 className="text-5xl font-extrabold tracking-wide sm:text-6xl lg:text-8xl text-[#181818]">
            Explore
            <strong className="block font-extrabold text-[#181818]">your Place</strong>
            <strong className="block font-extrabold text-primary">To Stay.</strong>
          </h1>

          <p className="mt-4 font-normal  max-w-lg sm:text-xl/relaxed">
            Search low prices on hotels for your dream locations in Nigeria.
          </p>
        </div>
      </div>
</section>
  )
}
