import Tabs, { TabItem, TabItems, TabPanel, TabPanels } from '../../components/Tabs'
import Card from '../../components/Card'
import Header from './../../components/Header'

const Home = () => (
  <div className="flex justify-center">
    <div className="px-8 container">
      <Header />
      <div className="mt-40 flex justify-center items-center">
        <div className="w-full sm:max-w-lg">
          <Card>
            <Tabs>
              <TabItems>
                <TabItem>Upload Documents</TabItem>
                <TabItem>My Documents</TabItem>
              </TabItems>
              <TabPanels>
                <TabPanel>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Ea error voluptates
                </TabPanel>
                <TabPanel>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Ea error voluptates voluptatibus dicta, maxime a et illum atque
                  praesentium quis hic c
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  </div>
)

export default Home
