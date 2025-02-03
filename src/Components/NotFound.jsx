import { Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

function NotFound() {
    return (
        <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 bg-light text-dark">
            <Row className="text-center">
                <Col>
                    <Image 
                        src="https://img.freepik.com/premium-vector/template-404-error-page-banner-with-found-message-mistake-warning-background-web-page-error-404-concept-creative-design-element_253396-496.jpg" 
                        fluid 
                        className="w-100"
                    />
                    <div className="mt-3">
                        <Link to="/">
                            <Button variant="primary" size="lg">Go to Home</Button>
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default NotFound;
