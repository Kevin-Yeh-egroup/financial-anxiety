'use client';

import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="site-footer"
      className="w-full bg-muted/30 border-t border-border py-12 md:py-14 px-4 sm:px-6 md:px-8 scroll-mt-20"
    >
      <div className="max-w-prose mx-auto w-full min-w-0">
        <div className="text-center text-sm text-muted-foreground leading-[1.6] text-pretty break-keep">
          <p>
            © {currentYear} 財務焦慮小檢測。保留所有權利。
          </p>
          <p className="mt-3">
            本工具僅供自我整理與教育參考，不能替代專業財務或心理健康建議。
          </p>
        </div>
      </div>
    </footer>
  );
}
