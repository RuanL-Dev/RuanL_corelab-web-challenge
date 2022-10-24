export default function IconImages({ imageName, size, type }) {
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  return <img src={`/images/${imageName}.${type}`} width={size} />
}
