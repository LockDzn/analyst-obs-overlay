import { useState } from 'react'
import { HiArrowDown, HiArrowUp } from 'react-icons/hi'
import './styles.scss'

interface Props {
  children: React.ReactNode
  title: string
  contentIsHiddenByDefault?: boolean
}

function Tab({ children, title, contentIsHiddenByDefault = false }: Props) {
  const [contentIsHidden, setContentIsHidden] = useState(
    contentIsHiddenByDefault
  )

  return (
    <div className="tab">
      <div className="layout">
        <header className="title">
          <h1>{title}</h1>
          <div
            className="button"
            onClick={() => setContentIsHidden(!contentIsHidden)}
          >
            {contentIsHidden ? (
              <HiArrowDown size={28} />
            ) : (
              <HiArrowUp size={28} />
            )}
          </div>
        </header>
        <div className={`content ${contentIsHidden ? 'contentIsHidden' : ''}`}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Tab
