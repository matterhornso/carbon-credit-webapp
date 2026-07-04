import { useContext, useEffect, useCallback, useState } from 'react'
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom'
/**
 * Blocks all navigation attempts. This is useful for preventing the page from
 * changing until some condition is met, like saving form data.
 *
 * @param  blocker
 * @param  when
 * @see https://reactrouter.com/api/useBlocker
 */

/**
 * resource found at https://gist.github.com/rmorse/426ffcc579922a82749934826fa9f743
 * useBlocker is to block the route and usePrompt will show the alert box*
 */

export function useBlocker(blocker: any, when = true) {
  const { navigator }: any = useContext(NavigationContext)

  useEffect(() => {
    if (!when) return

    const unblock = navigator.block((tx: any) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          // Automatically unblock the transition so it can play all the way
          // through before retrying it. TODO: Figure out how to re-enable
          // this block if the transition is cancelled for some reason.
          unblock()
          tx.retry()
        },
      }

      blocker(autoUnblockingTx)
    })

    return unblock
  }, [navigator, blocker, when])
}
/**
 * Prompts the user with an Alert before they leave the current screen.
 *
 * @param  message
 * @param  when
 */
export function usePrompt(message: any, when: any) {
  const blocker = useCallback(
    (tx: any) => {
      // eslint-disable-next-line no-alert
      if (window.confirm(message)) tx.retry()
    },
    [message]
  )

  useBlocker(blocker, when)
}
