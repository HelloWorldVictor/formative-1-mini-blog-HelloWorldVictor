import { useEffect, type ComponentType } from 'react'

/**
 * Higher-order component that logs to the console when the wrapped
 * component mounts and unmounts.
 *
 * @param WrappedComponent component to wrap
 * @param name label used in the log (defaults to the component's name)
 */
function withLogger<P extends object>(
  WrappedComponent: ComponentType<P>,
  name: string = WrappedComponent.displayName || WrappedComponent.name || 'Component',
) {
  function WithLogger(props: P) {
    useEffect(() => {
      console.log(`[withLogger] ${name} mounted`)
      return () => {
        console.log(`[withLogger] ${name} unmounted`)
      }
    }, [])

    return <WrappedComponent {...props} />
  }

  WithLogger.displayName = `withLogger(${name})`
  return WithLogger
}

export default withLogger
