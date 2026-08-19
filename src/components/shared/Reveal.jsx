import useReveal from '../../hooks/useReveal.js'

/**
 * Declarative scroll-reveal wrapper.
 *
 * <Reveal type="left" delay={120}>
 *   <h2>Hello</h2>
 * </Reveal>
 */
export default function Reveal({
  as: Tag = 'div',
  type = 'fade',
  delay = 0,
  className = '',
  style,
  children,
  ...rest
}) {
  const [ref, visible] = useReveal()

  return (
    <Tag
      ref={ref}
      data-reveal={type}
      data-visible={visible}
      style={{ '--delay': `${delay}ms`, ...style }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  )
}
