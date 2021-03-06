import * as React from 'react'
import { Octicon, OcticonSymbol } from '../octicons'

interface IBannerProps {
  readonly id?: string
  readonly timeout?: number
  readonly onDismissed: () => void
}

export class Banner extends React.Component<IBannerProps, {}> {
  private timeoutId: NodeJS.Timer | null = null

  public render() {
    return (
      <div id={this.props.id} className="banner">
        <div className="contents">{this.props.children}</div>
        <div className="close">
          <a onClick={this.props.onDismissed}>
            <Octicon symbol={OcticonSymbol.x} />
          </a>
        </div>
      </div>
    )
  }

  public componentDidMount = () => {
    if (this.props.timeout !== undefined) {
      this.timeoutId = setTimeout(() => {
        this.props.onDismissed()
      }, this.props.timeout)
    }
  }

  public componentWillUnmount = () => {
    if (this.props.timeout !== undefined && this.timeoutId !== null) {
      clearTimeout(this.timeoutId)
    }
  }
}
