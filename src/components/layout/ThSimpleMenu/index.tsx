import ThMenuItem from '@/components/feature/ThMenuItem'

function ThSimpleMenu() {
  return (
    <>
      {/* desktop view */}
      <div className="tw-absolute tw-top-0 tw-bottom-0 tw-left-0 tw-hidden md:tw-block tw-w-[80px] tw-bg-[#1B1B1B]">
        <ThMenuItem />
      </div>

      {/* mobile view */}
      <div className="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-block md:tw-hidden tw-bg-[#181818]/50">
        <ThMenuItem />
      </div>
    </>
  )
}

export default ThSimpleMenu
