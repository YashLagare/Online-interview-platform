import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'
const App = () => {
  return (
    <div>
      <h1>Welcome</h1>

      <SignedOut>
        <SignInButton mode='modal'/>
      </SignedOut>

      <SignedIn>
        <SignOutButton />
      </SignedIn>

      
        <UserButton/>

    </div>
  )
}

export default App