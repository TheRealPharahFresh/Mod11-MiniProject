import { Button, Card, Container } from "react-bootstrap";

function HomePage() {
  return (
    <div className="bg-dark text-light vh-100 border">
      <Container fluid className="py-5 ">
        <h1 className="text-center">Welcome to Our E-Commerce App</h1>
        <p className="text-center fw-bold">
          This is the place to find all your needs at one click.
        </p>
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Button className="shadow-lg" variant="primary" type="submit">
            Shop Now
          </Button>
        </div>
        <div className="bg-dark text-light d-flex flex-row justify-content-center gap-3 flex-wrap">
          <Card className="shadow-lg rounded" style={{ width: "18rem" }}>
            <Card.Img
              variant="bottom"
              src="https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/107/367/582/original/1424268_01.jpg.jpeg?action=crop&width=600"
            />
            <Card.Body>
              <Card.Title>
                The 2025 edition of the Air Jordan 1 Retro High '85
              </Card.Title>
              <Card.Text>
                Facts The 2025 edition of the Air Jordan 1 Retro High '85 OG
                'Bred' brings back the coveted original colorway in remastered
                form. Featuring the higher collar and wider toe box of the 1985
                release, the leather upper combines a black foundation with
                contrasting Varsity Red accents. They land on the perforated
                toe, signature Swoosh, heel overlay and collar flap. The latter
                displays a debossed Wings logo, while a woven Nike Air tag
                adorns the breathable nylon tongue. Undergirding the sneaker is
                a rubber cupsole, highlighted by white sidewalls and a durable
                crimson outsole.
              </Card.Text>
              <Button variant="primary">Buy Now</Button>
            </Card.Body>
          </Card>
          <Card className="shadow-lg rounded" style={{ width: "18rem" }}>
            <Card.Img
              variant="bottom"
              src="https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/106/958/862/original/1403298_01.jpg.jpeg?action=crop&width=600"
            />
            <Card.Body>
              <Card.Title>
                The Air Jordan 5 Retro OG 'Black Metallic'
              </Card.Title>
              <Card.Text>
                Facts The Air Jordan 5 Retro OG 'Black Metallic Reimagined'
                brings back a black nubuck upper with molded TPU eyelets,
                quarter panel netting and reflective piping. Additional 3M
                reflective accents appear on the padded tongue, marked with a
                crimson Jumpman logo, and the raised Nike Air branding that
                decorates the back heel. The sneaker is mounted on a black
                polyurethane midsole, featuring metallic silver shark tooth
                detailing and a visible Air-sole unit in the heel. A translucent
                rubber outsole provides durable traction underfoot.
              </Card.Text>
              <Button variant="primary">Buy Now</Button>
            </Card.Body>
          </Card>
          <Card className="shadow-lg rounded" style={{ width: "18rem" }}>
            <Card.Img
              variant="bottom"
              src="https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/105/545/601/original/1373134_01.jpg.jpeg?action=crop&width=600"
            />
            <Card.Body>
              <Card.Title>Air Jordan 4 Retro Fear 2024</Card.Title>
              <Card.Text>
                Facts The 2024 edition of the Air Jordan 4 Retro 'Fear' brings
                back a neutral colorway of the classic silhouette. Originally
                released in 2013, the mid-top sports a smooth nubuck upper,
                featuring a mudguard and toe wrap in two shades of grey. Molded
                eyelets are rendered in white, matching the Jumpman branding
                hits that decorate the woven tongue tag and back heel. White
                speckled detailing covers a black polyurethane midsole with
                visible Air-sole cushioning in the heel.
              </Card.Text>
              <Button variant="primary">Buy Now</Button>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default HomePage;
