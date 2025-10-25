export function loadScript(src: string, id?: string) {
    return new Promise<void>((resolve, reject) => {
      if (id && document.getElementById(id)) return resolve(); // already loaded
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      if (id) s.id = id;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.body.appendChild(s);
    });
  }