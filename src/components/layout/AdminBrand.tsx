const logo = '/images/magie-logo.jpg'

export function AdminIcon() {
  return <img className="magie-mark" src={logo} alt="" width={24} height={24} />
}

export function AdminLogo() {
  return (
    <img
      className="magie-brand"
      src={logo}
      alt="MAGIE Facility Service C&D"
      width={132}
      height={132}
    />
  )
}
