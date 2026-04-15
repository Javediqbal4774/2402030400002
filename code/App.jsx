// App.jsx - A fully working, single-page miniature React application.
import React, { useState } from 'react';
import { recipesDatabase } from './data'; // We import our database
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Don't forget to create a blank App.css file

function App() {
    // These "states" manage the fully working parts of our site
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    // This function runs when you click "View Full Recipe"
    const showRecipe = (id) => {
        const recipe = recipesDatabase.find(r => r.id === id);
        setSelectedRecipe(recipe);
    };

    // This function handles the "Fake" add recipe submission
    const handleAddRecipe = (e) => {
        e.preventDefault();
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000); // Hide message after 3 seconds
        e.target.reset();
    };

    // --- Component: Header ---
    const Header = () => (
        <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
            <div className="container">
                <a className="navbar-brand fw-bold text-danger" href="#" onClick={() => setCurrentPage('home')}>COMMUNITY COOK</a>
                <div className="navbar-nav ms-auto">
                    <a className="nav-link" href="#" onClick={() => setCurrentPage('home')}>Home</a>
                    <a className="nav-link" href="#" onClick={() => setCurrentPage('browse')}>Browse Recipes</a>
                    <a className="nav-link" href="#" onClick={() => setCurrentPage('add')}>Add Recipe</a>
                </div>
            </div>
        </nav>
    );

    // --- Page: Home ---
    const HomePage = () => (
        <>
            <header className="hero">
                <div className="container text-center text-white py-5">
                    <h1 className="display-3 fw-bold">Shared Flavors, One Table</h1>
                    <p className="lead">Join the world's largest collaborative cookbook, contributed by the community.</p>
                    <button className="btn btn-danger btn-lg rounded-pill" onClick={() => setCurrentPage('browse')}>Explore 20+ Recipes</button>
                </div>
            </header>
            <section className="container my-5 text-center">
                <h2 className="fw-bold mb-4">How It Works</h2>
                <div className="row g-4">
                    <div className="col-md-4"><div className="card p-4 border-0 shadow-sm"><i className="fas fa-edit fa-3x text-danger mb-3"></i><h4>Contribute</h4><p>Share your family's favorite dishes.</p></div></div>
                    <div className="col-md-4"><div className="card p-4 border-0 shadow-sm"><i className="fas fa-users fa-3x text-danger mb-3"></i><h4>Collaborate</h4><p>Edit and improve recipes together.</p></div></div>
                    <div className="col-md-4"><div className="card p-4 border-0 shadow-sm"><i className="fas fa-utensils fa-3x text-danger mb-3"></i><h4>Cook</h4><p>Discover and make meals from around the world.</p></div></div>
                </div>
            </section>
        </>
    );

    // --- Page: Browse Recipes (20 Unique Images) ---
    const BrowsePage = () => (
        <div className="container my-5">
            <h2 className="fw-bold mb-4">Explore 20 Community Favorites</h2>
            <div className="row g-4">
                {recipesDatabase.map(recipe => (
                    <div className="col-lg-3 col-md-4 col-sm-6" key={recipe.id}>
                        <div className="card recipe-card shadow-sm h-100 position-relative">
                            <span className="badge bg-danger rounded-pill position-absolute top-0 end-0 m-3">{recipe.category}</span>
                            <img src={recipe.image} className="recipe-img card-img-top" alt={recipe.title} />
                            <div className="card-body">
                                <h6 className="fw-bold">{recipe.title}</h6>
                                <p className="text-muted small mb-1">Contributed by: {recipe.user}</p>
                                <div className="d-flex justify-content-between text-muted small mb-3">
                                    <span><i className="far fa-clock"></i> {recipe.time}</span>
                                    <span><i className="fas fa-star text-warning"></i> 4.9</span>
                                </div>
                                <button className="btn btn-sm btn-outline-danger w-100" onClick={() => showRecipe(recipe.id)}>View Full Recipe</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // --- Page: Add Recipe (Image Upload Option) ---
    const AddRecipePage = () => (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6 bg-white p-5 shadow-sm rounded">
                    <h3 className="fw-bold text-center mb-4">Share Your Secret Recipe</h3>
                    {uploadSuccess && <div className="alert alert-success">Success! Your recipe and image have been added to the collaborative database.</div>}
                    <form onSubmit={handleAddRecipe}>
                        <div className="mb-3"><label className="form-label">Dish Name</label><input type="text" className="form-control" required placeholder="e.g. Grandma's Apple Pie" /></div>
                        <div className="mb-3"><label className="form-label">Category</label><select className="form-select"><option>Breakfast</option><option>Lunch</option><option>Dinner</option><option>Dessert</option></select></div>
                        <div className="mb-3"><label className="form-label">Ingredients (one per line)</label><textarea className="form-control" rows="3"></textarea></div>
                        <div className="mb-3"><label className="form-label">Instructions</label><textarea className="form-control" rows="3"></textarea></div>
                        <div className="mb-3"><label className="form-label">Dish Image (Upload)</label><input type="file" className="form-control" accept="image/*" /></div>
                        <button type="submit" className="btn btn-danger w-100">Publish to Community Cookbook</button>
                    </form>
                </div>
            </div>
        </div>
    );

    // --- Component: Recipe Detail Modal (Pop-up) ---
    const RecipeModal = () => (
        <div className={`modal ${selectedRecipe ? 'show d-block' : ''}`} tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bold">{selectedRecipe?.title}</h5>
                        <button type="button" className="btn-close" onClick={() => setSelectedRecipe(null)}></button>
                    </div>
                    <div className="modal-body p-0">
                        <img src={selectedRecipe?.image} className="img-fluid w-100" style={{ height: '300px', objectFit: 'cover' }} alt={selectedRecipe?.title} />
                        <div className="p-4">
                            <h6><strong>Contributed by:</strong> {selectedRecipe?.user}</h6>
                            <hr />
                            <h5>Ingredients</h5>
                            <ul>{selectedRecipe?.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}</ul>
                            <h5>Instructions</h5>
                            <p>{selectedRecipe?.instructions}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // --- Component: Footer ---
    const Footer = () => <footer className="bg-dark text-white py-4 text-center mt-auto"><p>&copy; 2026 Digital Community Cookbook | Created by Sanam Akhter</p></footer>;

    // --- Main Render Logic ---
    return (
        <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#fffaf5', fontFamily: 'Poppins, sans-serif' }}>
            <Header />
            {currentPage === 'home' && <HomePage />}
            {currentPage === 'browse' && <BrowsePage />}
            {currentPage === 'add' && <AddRecipePage />}
            <RecipeModal />
            <Footer />
        </div>
    );
}

export default App;