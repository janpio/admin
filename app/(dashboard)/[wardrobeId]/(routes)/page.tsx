interface WardrobePageProps {
    params: {
        wardrobeId: string;
    }
}

const WardrobePage = ({params}: WardrobePageProps) => {
  return (
    <div>
        {params.wardrobeId}
    </div>
  )
}

export default WardrobePage