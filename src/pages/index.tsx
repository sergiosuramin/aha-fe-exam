import ThFriendList from '@/components/feature/ThFriendList'
import ThSearchUser from '@/components/feature/ThSearchUser'
import ThTabs from '@/components/ui/ThTabs'

export default function HomePage() {
  return (
    <div className="xl:tw-flex md:tw-pl-16">
      <div className="tw-container tw-flex tw-flex-col md:tw-min-h-screen tw-mr-auto tw-pb-16 tw-px-8 md:tw-p-16 xl:tw-max-w-[975px]">
        <ThSearchUser />
      </div>

      <div className="tw-bg-[#181818] tw-hidden xl:tw-block tw-w-[375px] tw-min-h-screen tw-fixed tw-right-0 tw-bottom-0 tw-top-0">
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
