import ThHomePage from '@/components/pages/ThHomePage'

export default function HomePage() {
  return (
    <div className="xl:tw-flex md:tw-pl-16">
      <div className="tw-container tw-flex tw-flex-col md:tw-min-h-screen tw-mx-auto tw-pb-16 tw-px-8 md:tw-p-16">
        <ThHomePage />
      </div>

      <div className="tw-bg-white tw-hidden xl:tw-block tw-w-[375px] tw-min-h-screen">
        hehe
      </div>
    </div>
  )
}
