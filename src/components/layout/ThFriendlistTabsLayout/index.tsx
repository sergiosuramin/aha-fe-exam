import ThFriendList from '@/components/feature/ThFriendList'
import ThTabs from '@/components/ui/ThTabs'

const ThFriendlistTabsLayout = () => {
  return (
    <div className="tw-bg-black-350 tw-hidden xl:tw-block tw-w-[375px] tw-min-h-screen tw-fixed tw-right-0 tw-bottom-0 tw-top-0">
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
  )
}

export default ThFriendlistTabsLayout
