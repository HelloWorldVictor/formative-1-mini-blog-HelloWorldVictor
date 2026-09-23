import Header from './components/Header'
import PostList from './components/PostList'

/** Root component: page header followed by the list of posts. */
function App() {
  return (
    <>
      <Header />
      <main>
        <PostList />
      </main>
    </>
  )
}

export default App
