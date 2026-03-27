'use client';

import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-muted/30 border-t border-border py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} 財務焦慮小檢測。保留所有權利。
          </p>
          <p className="mt-2">
            本工具僅供自我整理與教育參考，不能替代專業財務或心理健康建議。
          </p>
        </div>
      </div>
    </footer>
  );
}
