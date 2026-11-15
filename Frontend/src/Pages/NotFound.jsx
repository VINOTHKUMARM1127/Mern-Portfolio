import { Link } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";
export default function NotFound() { return <PageLayout><section className="min-h-[65vh] flex flex-col items-center justify-center px-6 pt-32 text-center"><p className="text-violet-300">404</p><h1 className="text-4xl font-bold my-5">This page could not be found</h1><p className="text-ink/60 mb-7">The link may have changed. Explore my projects or return home.</p><Link to="/" className="px-6 py-3 bg-violet-600 rounded-xl">Back to home</Link></section></PageLayout>; }
