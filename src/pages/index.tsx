import ThFriendList from '@/components/feature/ThFriendList'
import ThSearchUser from '@/components/feature/ThSearchUser'
import ThTabs from '@/components/ui/ThTabs'

export default function HomePage() {
  return (
    <div className="xl:tw-flex md:tw-pl-16">
      <div className="tw-container tw-flex tw-flex-col md:tw-min-h-screen tw-mx-auto tw-pb-16 tw-px-4 md:tw-px-15 md:tw-pt-12 md:tw-pb-24 xl:tw-max-w-[780px]">
        <ThSearchUser />
      </div>

      <div className="tw-bg-[#181818] tw-hidden xl:tw-block tw-w-[375px] tw-min-h-screen">
        <ThTabs
          tabs={[
            {
              title: 'Followers',
              component: <ThFriendList />,
            },
            {
              title: 'Following',
              component: <ThFriendList following />,
            },
          ]}
        />
      </div>
    </div>
  )
}
