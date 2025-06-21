import Link from "next/link";

// src/app/not-found.tsx
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-gray-600">
          요청하신 페이지가 존재하지 않거나, 삭제되었을 수 있습니다.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
