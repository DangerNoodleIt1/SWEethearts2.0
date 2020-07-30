import React, { Fragment } from 'react';
import { Button, Container, Row, Col, Carousel, Image } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import '../styles/landing.scss';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

/*
 * HELPER FUNCTION: nextPath
 * Push `path` to Landing component's destructured `history` prop
 * (provided by invoking withRouter on Landing component before export)
 */
const redirectToPath = (history, path) => {
	history.push(path);
};

const Landing = ({ history }) => {
	return (
		<div>
			<Container fluid className="container mt-4">
				<div>
					<p>
						<Carousel className="mt-2 d-flex justify-content-center ">
							<Carousel.Item>
								<img
									className="d-block w-100"
									src="https://singularityhub.com/wp-content/uploads/2018/06/artificial-intelligence-confusion-719504626.jpg"
									alt="First slide"
								/>
								<Carousel.Caption>
									<h3>First slide label</h3>
									<p>
										Nulla vitae elit libero, a pharetra augue mollis interdum.
									</p>
								</Carousel.Caption>
							</Carousel.Item>
							<Carousel.Item>
								<img
									className="d-block w-100"
									src="https://makemeaprogrammer.com/wp-content/uploads/2019/04/Are-Software-Engineers-Happy-Yes-They-Are-And-Heres-Why-1.jpg"
									alt="Third slide"
								/>

								<Carousel.Caption>
									<h3>Second slide label</h3>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									</p>
								</Carousel.Caption>
							</Carousel.Item>
							<Carousel.Item>
								<img
									className="d-block w-100"
									src="https://cdn-media-1.freecodecamp.org/images/dMoVLfSvnTDo4KKaisVJiw3l7Kcl-wKoXDNo"
									alt="Third slide"
								/>

								<Carousel.Caption>
									<h3>Third slide label</h3>
									<p>
										Praesent commodo cursus magna, vel scelerisque nisl
										consectetur.
									</p>
								</Carousel.Caption>
							</Carousel.Item>
						</Carousel>
					</p>
				</div>

				<div className="mt-2 d-flex justify-content-center">
					<Button
						className=""
						onClick={() => redirectToPath(history, '/explore')}
						size="lg"
						variant="outline-info"
						block
					>
						Start Exploring
					</Button>
				</div>
			</Container>
		</div>
	);
};

export default withRouter(Landing);
