import Link from 'next/link'

export default function Home() {
  return <>top
  <br />
  <Link href="/test">Link to test</Link>
  <br />
  <Link href="/test2">Link to test2</Link>
  <br />
  <Link href="/test2/1">Link to test2/1 (not working)</Link>
  </>
}
