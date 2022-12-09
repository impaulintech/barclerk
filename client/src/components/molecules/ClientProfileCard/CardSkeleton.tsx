import LineSkeleton from '~/components/atoms/Skeletons/LineSkeleton'

export const CardSkeleton = () => {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="mt-2 mb-4 hidden sm:flex">
        <LineSkeleton className="h-5 w-52" />
      </div>
      {/* ProfileHeader */}
      <div className="my-2 flex justify-between">
        <LineSkeleton className="h-5 w-72" />
        <LineSkeleton className="h-5 w-40" />
      </div>
      {/* ProfileCard */}
      <div className="flex w-full flex-col  space-y-6 md:flex-row md:space-y-0 md:justify-between">
        <div className="space-y-6 md:mr-12 md:flex md:flex-col md:w-1/2 md:overflow-hidden">
          {/* ProfileInfo */}
          <div className="space-y-7 rounded-lg bg-white px-5 py-5">
            <LineSkeleton className="h-5 w-52" />
            <div className="flex justify-between">
              <div className="flex w-1/3 flex-col space-y-1">
                <LineSkeleton className="w-24 p-2 md:w-1/2" />
                <LineSkeleton className="w-14 p-1.5 md:w-3/4" />
              </div>
              <div className="flex w-1/3 flex-col space-y-1">
                <LineSkeleton className="w-24 p-2 md:w-1/2" />
                <LineSkeleton className="w-14 p-1.5 md:w-3/4" />
              </div>
              <div className="flex w-1/3 flex-col space-y-1">
                <LineSkeleton className="w-20 p-2 md:w-1/2" />
                <LineSkeleton className="w-20 p-1.5 md:w-3/4" />
              </div>
            </div>
            <div className="flex flex-col">
              <LineSkeleton className="w-20 p-2" />
              <LineSkeleton className="w-52 p-1.5" />
            </div>
            <div className="flex flex-col">
              <LineSkeleton className="w-20 p-2" />
              <div className="ml-4">
                <LineSkeleton className="w-32 p-1.5" />
                <LineSkeleton className="w-32 p-1.5" />
                <LineSkeleton className="w-40 p-1.5" />
                <LineSkeleton className="w-28 p-1.5" />
              </div>
            </div>
          </div>
          {/* ProfileFunds */}
          <div className="space-y-1 rounded-lg bg-white px-5 py-5 md:grid md:grid-cols-3 md:space-y-0">
            <div className="flex justify-between md:col-span-1 md:flex-col">
              <LineSkeleton className="w-32 p-1.5 md:w-1/2" />
              <LineSkeleton className="w-28 p-1.5 md:w-3/4" />
            </div>
            <div className="flex justify-between md:col-span-1 md:flex-col">
              <LineSkeleton className="w-28 p-1.5 md:w-1/2" />
              <LineSkeleton className="w-32 p-1.5 md:w-3/4" />
            </div>
            <div className="flex justify-between md:col-span-1 md:flex-col">
              <LineSkeleton className="w-40 p-1.5 md:w-1/2" />
              <LineSkeleton className="w-32 p-1.5 md:w-3/4" />
            </div>
          </div>
          {/* ProfileOthers */}
          <div className="space-y-1 rounded-lg bg-white px-5 py-5 md:grid md:grid-cols-3 md:space-y-0">
            <div className="flex justify-between md:col-span-1 md:flex-col">
              <LineSkeleton className="w-32 p-1.5 md:w-1/2" />
              <LineSkeleton className="w-28 p-1.5 md:w-3/4" />
            </div>
            <div className="flex justify-between md:col-span-1 md:flex-col">
              <LineSkeleton className="w-28 p-1.5 md:w-1/2" />
              <LineSkeleton className="w-32 p-1.5 md:w-3/4" />
            </div>
            <div className="flex justify-between md:col-span-1 md:flex-col">
              <LineSkeleton className="w-40 p-1.5 md:w-1/2" />
              <LineSkeleton className="w-32 p-1.5 md:w-3/4" />
            </div>
          </div>
        </div>

        {/* CourtInfo */}
        <div className="md:flex md:flex-col md:w-1/2 md:space-y-6 md:overflow-hidden">
          <div className="rounded-lg bg-white px-5 py-5">
            <div className="flex items-center justify-between">
              <LineSkeleton className="w-32 p-1.5" />
              <LineSkeleton className="w-28 p-1.5" />
            </div>
          </div>
          {/* LastCourtDates */}
          <div className="rounded-lg bg-white px-5 py-5">
            <div className="flex flex-col">
              <div className="mb-5 border-b-2 pb-2">
                <LineSkeleton className="w-40 p-1.5" />
              </div>
              <div className="flex flex-col space-y-5 border-b-2 py-5">
                <div className="flex flex-col">
                  <div className="flex space-x-2">
                    <div className="w-16">
                      <LineSkeleton className="" />
                    </div>
                    <div className="flex w-full">
                      <LineSkeleton className="w-32" />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-16">
                      <LineSkeleton className="" />
                    </div>
                    <div className="flex w-full flex-col">
                      <LineSkeleton className="w-10/12 p-1" />
                      <LineSkeleton className="w-11/12 p-1" />
                      <LineSkeleton className="w-8/12 p-1" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-5 border-b-2 py-5">
                <div className="flex flex-col">
                  <div className="flex space-x-2">
                    <div className="w-16">
                      <LineSkeleton className="" />
                    </div>
                    <div className="flex w-full">
                      <LineSkeleton className="w-32" />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-16">
                      <LineSkeleton className="" />
                    </div>
                    <div className="flex w-full flex-col">
                      <LineSkeleton className="w-10/12 p-1" />
                      <LineSkeleton className="w-11/12 p-1" />
                      <LineSkeleton className="w-8/12 p-1" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-5 border-b-2 py-5">
                <div className="flex flex-col">
                  <div className="flex space-x-2">
                    <div className="w-16">
                      <LineSkeleton className="" />
                    </div>
                    <div className="flex w-full">
                      <LineSkeleton className="w-32" />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-16">
                      <LineSkeleton className="" />
                    </div>
                    <div className="flex w-full flex-col">
                      <LineSkeleton className="w-10/12 p-1" />
                      <LineSkeleton className="w-11/12 p-1" />
                      <LineSkeleton className="w-8/12 p-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 flex w-full justify-center">
              <LineSkeleton className="w-24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
