import ThSearchUser from '@/components/feature/ThSearchUser'

export default function HomePage() {
  return (
    <div className="xl:tw-flex md:tw-pl-[80px]">
      <div className="tw-container tw-flex tw-flex-col md:tw-min-h-screen tw-mx-auto tw-px-6 md:tw-px-15 md:tw-pt-12 md:tw-pb-[88px] xl:tw-max-w-[775px]">
        <ThSearchUser />
      </div>
    </div>
  )
}

HomePage.getInitialProps = () => {
  return { withFriend: true }
}
