import ThSearchUser from '@/components/feature/ThSearchUser'
import ThFriendlistTabsLayout from '@/components/layout/ThFriendlistTabsLayout'

export default function HomePage() {
  return (
    <div className="xl:tw-flex md:tw-pl-16">
      <div className="tw-container tw-flex tw-flex-col md:tw-min-h-screen tw-mx-auto tw-pb-16 tw-px-4 md:tw-px-15 md:tw-pt-12 md:tw-pb-24 xl:tw-max-w-[780px]">
        <ThSearchUser />
      </div>

      <ThFriendlistTabsLayout />
    </div>
  )
}
