import React from 'react';
import { Container, Row, Col, Card, Button, Carousel, Navbar, Nav } from 'react-bootstrap';
import './pagescss/newuser.css'; // Custom CSS file for additional styling

import { Link, NavLink } from "react-router-dom";
const LandingPage = () => {
  // Sample blog posts data
  const recentPosts = [
    {
      id: 1,
      title: "10 Creative Ways to Reuse Plastic Bottles",
      excerpt: "Discover innovative ways to give plastic bottles a second life instead of throwing them away.",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      date: "June 15, 2023"
    },
    {
      id: 2,
      title: "The Ultimate Guide to Composting at Home",
      excerpt: "Learn how to turn your kitchen scraps into nutrient-rich compost for your garden.",
      image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      date: "June 8, 2023"
    },
    {
      id: 3,
      title: "How to Properly Recycle Electronics",
      excerpt: "E-waste is a growing problem. Here's how to dispose of your old gadgets responsibly.",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      date: "June 1, 2023"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      quote: "This blog completely changed how I view recycling. I've reduced my household waste by 60%!",
      author: "Sarah Johnson",
      location: "Portland, OR"
    },
    {
      id: 2,
      quote: "The tips are practical and easy to implement. My kids love the creative projects!",
      author: "Michael Chen",
      location: "Austin, TX"
    }
  ];

  return (
    <div className="landing-page">
      {/* Navigation */}
      

      {/* Hero Section */}
      <section className="hero-section py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4">Make Recycling <span className="text-success">Easy</span> & <span className="text-success">Effective</span></h1>
              <p className="lead mb-4">
                Discover practical recycling tips and creative upcycling ideas to reduce waste and help our planet.
              </p>
              <div className="d-flex gap-3">
                <Button variant="success" size="lg"><NavLink to='/auth' className="nav-link">Explore Tips</NavLink></Button>
                <Button variant="outline-success" size="lg"><NavLink to='/auth' className="nav-link">Learn More</NavLink></Button>
              </div>
            </Col>
            {/* <Col lg={6}>
              <img 
                src="https://images.unsplash.com/photo-1588520966910-37a9ca70f444?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Recycling bins" 
                className="img-fluid rounded shadow-lg" 
              />
            </Col> */}
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-success text-white">
        <Container>
          <Row className="text-center">
            <Col md={3} className="mb-4 mb-md-0">
              <h2 className="display-4 fw-bold">1,200+</h2>
              <p className="mb-0">Recycling Tips</p>
            </Col>
            <Col md={3} className="mb-4 mb-md-0">
              <h2 className="display-4 fw-bold">50K+</h2>
              <p className="mb-0">Community Members</p>
            </Col>
            <Col md={3} className="mb-4 mb-md-0">
              <h2 className="display-4 fw-bold">12M</h2>
              <p className="mb-0">Pounds of Waste Reduced</p>
            </Col>
            <Col md={3}>
              <h2 className="display-4 fw-bold">100+</h2>
              <p className="mb-0">Creative Upcycling Ideas</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Recent Posts */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5">Recent <span className="text-success">Blog Posts</span></h2>
          <Row>
            {recentPosts.map(post => (
              <Col md={4} key={post.id} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Img variant="top" src={post.image} />
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.excerpt}</Card.Text>
                  </Card.Body>
                  <Card.Footer className="bg-transparent border-top-0">
                    <small className="text-muted">{post.date}</small>
                    <Button variant="link" className="float-end">Read More</Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4">
            <Button variant="success" size="lg">View All Posts</Button>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">What Our <span className="text-success">Community</span> Says</h2>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Carousel indicators={false} interval={5000}>
                {testimonials.map(testimonial => (
                  <Carousel.Item key={testimonial.id}>
                    <blockquote className="blockquote text-center">
                      <p className="mb-4 display-6">"{testimonial.quote}"</p>
                      <footer className="blockquote-footer">
                        {testimonial.author} <cite>{testimonial.location}</cite>
                      </footer>
                    </blockquote>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="py-5 bg-success text-white">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h2 className="mb-4">Join Our Recycling Community</h2>
              <p className="lead mb-4">Get weekly recycling tips and creative upcycling ideas straight to your inbox.</p>
              <div className="d-flex gap-2 justify-content-center">
                
                <NavLink to="/auth" className="nav-link" >Login</NavLink>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-5 bg-dark text-white">
        <Container>
          <Row>
            <Col md={4} className="mb-4 mb-md-0">
              <h5 className="mb-3">
                <i className="bi bi-recycle me-2"></i>RecycleTips
              </h5>
              <p>Helping you make sustainable choices through practical recycling tips and creative upcycling ideas.</p>
            </Col>
            <Col md={2} className="mb-4 mb-md-0">
              <h5 className="mb-3">Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="#home" className="text-white text-decoration-none">Home</a></li>
                <li><a href="#tips" className="text-white text-decoration-none">Tips</a></li>
                <li><a href="#about" className="text-white text-decoration-none">About</a></li>
                <li><a href="#contact" className="text-white text-decoration-none">Contact</a></li>
              </ul>
            </Col>
            <Col md={3} className="mb-4 mb-md-0">
              <h5 className="mb-3">Categories</h5>
              <ul className="list-unstyled">
                <li><a href="#plastic" className="text-white text-decoration-none">Plastic Recycling</a></li>
                <li><a href="#paper" className="text-white text-decoration-none">Paper Recycling</a></li>
                <li><a href="#electronics" className="text-white text-decoration-none">E-Waste</a></li>
                <li><a href="#composting" className="text-white text-decoration-none">Composting</a></li>
              </ul>
            </Col>
            <Col md={3}>
              <h5 className="mb-3">Connect With Us</h5>
              <div className="d-flex gap-3">
                <a href="#facebook" className="text-white"><i className="bi bi-facebook fs-4"></i></a>
                <a href="#twitter" className="text-white"><i className="bi bi-twitter fs-4"></i></a>
                <a href="#instagram" className="text-white"><i className="bi bi-instagram fs-4"></i></a>
                <a href="#pinterest" className="text-white"><i className="bi bi-pinterest fs-4"></i></a>
              </div>
            </Col>
          </Row>
          <hr className="my-4" />
          <p className="text-center mb-0">&copy; {new Date().getFullYear()} RecycleTips. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;