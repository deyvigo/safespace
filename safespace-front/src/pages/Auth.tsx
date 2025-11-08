import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Mail, Lock, User, ArrowLeft, Calendar, GraduationCap, Building2, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiService, type FacultyDTO } from "@/services/api";

type UserType = "student" | "psychologist";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<UserType>("student");
  const [faculties, setFaculties] = useState<FacultyDTO[]>([]);
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Refs para los inputs del formulario de login
  const loginEmailRef = useRef<HTMLInputElement>(null);
  const loginPasswordRef = useRef<HTMLInputElement>(null);

  // Refs para los inputs del formulario de registro
  const signupNameRef = useRef<HTMLInputElement>(null);
  const signupLastNameRef = useRef<HTMLInputElement>(null);
  const signupEmailRef = useRef<HTMLInputElement>(null);
  const signupPasswordRef = useRef<HTMLInputElement>(null);
  const signupConfirmPasswordRef = useRef<HTMLInputElement>(null);
  const signupBirthDayRef = useRef<HTMLInputElement>(null);
  const signupUniversityRef = useRef<HTMLInputElement>(null);
  const signupProfessionRef = useRef<HTMLInputElement>(null);

  // Cargar facultades al montar el componente
  useEffect(() => {
    const loadFaculties = async () => {
      try {
        const facultiesData = await apiService.getFaculties();
        setFaculties(facultiesData);
      } catch (error) {
        console.error("Error al cargar facultades:", error);
      }
    };
    loadFaculties();
  }, []);

  // Resetear facultad seleccionada cuando cambia el tipo de usuario
  useEffect(() => {
    setSelectedFacultyId("");
  }, [userType]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const email = loginEmailRef.current?.value || "";
      const password = loginPasswordRef.current?.value || "";

      if (!email || !password) {
        toast({
          title: "Error",
          description: "Por favor completa todos los campos",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // El backend espera 'username', pero el formulario usa 'email'
      // Asumimos que el email es el username
      const response = await apiService.login({
        username: email,
        password: password,
      });

      // Guardar el token en localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("refreshToken", response.refreshToken);

      toast({
        title: "¡Bienvenido!",
        description: "Has iniciado sesión correctamente",
      });

      // Redirigir al dashboard
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error al iniciar sesión",
        description: error instanceof Error ? error.message : "Credenciales incorrectas",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const name = signupNameRef.current?.value || "";
      const lastName = signupLastNameRef.current?.value || "";
      const email = signupEmailRef.current?.value || "";
      const password = signupPasswordRef.current?.value || "";
      const confirmPassword = signupConfirmPasswordRef.current?.value || "";
      const birthDay = signupBirthDayRef.current?.value || "";

      // Validaciones comunes
      if (!name || !lastName || !email || !password || !confirmPassword || !birthDay) {
        toast({
          title: "Error",
          description: "Por favor completa todos los campos obligatorios",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        toast({
          title: "Error",
          description: "Las contraseñas no coinciden",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (password.length < 6) {
        toast({
          title: "Error",
          description: "La contraseña debe tener al menos 6 caracteres",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Validar fecha de nacimiento (debe ser en el pasado)
      const birthDate = new Date(birthDay);
      if (birthDate >= new Date()) {
        toast({
          title: "Error",
          description: "La fecha de nacimiento debe ser en el pasado",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Formatear fecha a YYYY-MM-DD
      const formattedBirthDay = birthDay;

      if (userType === "student") {
        // Validar facultad para estudiantes
        if (!selectedFacultyId) {
          toast({
            title: "Error",
            description: "Por favor selecciona una facultad",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        const response = await apiService.registerStudent({
          username: email,
          password: password,
          name: name.trim(),
          last_name: lastName.trim(),
          birth_day: formattedBirthDay,
          id_faculty: parseInt(selectedFacultyId),
        });

        toast({
          title: "¡Cuenta creada!",
          description: "Tu cuenta de estudiante ha sido creada exitosamente. Por favor inicia sesión.",
        });
      } else {
        // Validar campos para psicólogos
        const university = signupUniversityRef.current?.value || "";
        const profession = signupProfessionRef.current?.value || "";

        if (!university || !profession) {
          toast({
            title: "Error",
            description: "Por favor completa todos los campos obligatorios",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        const response = await apiService.registerPsychologist({
          username: email,
          password: password,
          name: name.trim(),
          last_name: lastName.trim(),
          birth_day: formattedBirthDay,
          university: university.trim(),
          profession: profession.trim(),
        });

        toast({
          title: "¡Cuenta creada!",
          description: "Tu cuenta de psicólogo ha sido creada exitosamente. Por favor inicia sesión.",
        });
      }

      // Cambiar a la pestaña de login después del registro exitoso
      setTimeout(() => {
        navigate("/auth");
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast({
        title: "Error al registrar",
        description: error instanceof Error ? error.message : "No se pudo crear la cuenta",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-calm flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Volver al inicio</span>
        </Link>

        {/* Logo and Welcome */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-primary/10 animate-float">
            <Heart className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">SafeSpace</h1>
            <p className="text-muted-foreground">Tu espacio de bienestar emocional</p>
          </div>
        </div>

        {/* Auth Card */}
        <Card className="p-6 shadow-large rounded-3xl bg-gradient-card border-border">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="rounded-xl">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="signup" className="rounded-xl">Registrarse</TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-foreground">Correo Electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      ref={loginEmailRef}
                      id="login-email"
                      type="email"
                      placeholder="tu@email.com"
                      className="pl-10 rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-foreground">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      ref={loginPasswordRef}
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <button type="button" className="text-sm text-primary hover:underline">
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                <Button 
                  type="submit" 
                  className="w-full rounded-xl h-11 text-base"
                  disabled={isLoading}
                >
                  {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>
              </form>
            </TabsContent>

            {/* Signup Form */}
            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignup} className="space-y-4">
                {/* Tipo de usuario */}
                <div className="space-y-2">
                  <Label htmlFor="signup-user-type" className="text-foreground">Tipo de Usuario</Label>
                  <Select value={userType} onValueChange={(value) => setUserType(value as UserType)}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Selecciona el tipo de usuario" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Estudiante</SelectItem>
                      <SelectItem value="psychologist">Psicólogo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Nombre */}
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-foreground">Nombre</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      ref={signupNameRef}
                      id="signup-name"
                      type="text"
                      placeholder="Tu nombre"
                      className="pl-10 rounded-xl"
                      required
                    />
                  </div>
                </div>

                {/* Apellido */}
                <div className="space-y-2">
                  <Label htmlFor="signup-lastname" className="text-foreground">Apellido</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      ref={signupLastNameRef}
                      id="signup-lastname"
                      type="text"
                      placeholder="Tu apellido"
                      className="pl-10 rounded-xl"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-foreground">Correo Electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      ref={signupEmailRef}
                      id="signup-email"
                      type="email"
                      placeholder="tu@email.com"
                      className="pl-10 rounded-xl"
                      required
                    />
                  </div>
                </div>

                {/* Fecha de nacimiento */}
                <div className="space-y-2">
                  <Label htmlFor="signup-birthday" className="text-foreground">Fecha de Nacimiento</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      ref={signupBirthDayRef}
                      id="signup-birthday"
                      type="date"
                      className="pl-10 rounded-xl"
                      required
                      max={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                {/* Campos específicos para estudiantes */}
                {userType === "student" && (
                  <div className="space-y-2">
                    <Label htmlFor="signup-faculty" className="text-foreground">Facultad</Label>
                    <Select value={selectedFacultyId} onValueChange={setSelectedFacultyId}>
                      <SelectTrigger id="signup-faculty" className="rounded-xl">
                        <SelectValue placeholder="Selecciona tu facultad" />
                      </SelectTrigger>
                      <SelectContent>
                        {faculties.map((faculty) => (
                          <SelectItem key={faculty.id} value={faculty.id.toString()}>
                            {faculty.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Campos específicos para psicólogos */}
                {userType === "psychologist" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="signup-university" className="text-foreground">Universidad</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          ref={signupUniversityRef}
                          id="signup-university"
                          type="text"
                          placeholder="Nombre de tu universidad"
                          className="pl-10 rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-profession" className="text-foreground">Profesión</Label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          ref={signupProfessionRef}
                          id="signup-profession"
                          type="text"
                          placeholder="Tu profesión"
                          className="pl-10 rounded-xl"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Contraseña */}
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-foreground">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      ref={signupPasswordRef}
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 rounded-xl"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                {/* Confirmar contraseña */}
                <div className="space-y-2">
                  <Label htmlFor="signup-confirm-password" className="text-foreground">Confirmar Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      ref={signupConfirmPasswordRef}
                      id="signup-confirm-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 rounded-xl"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full rounded-xl h-11 text-base"
                  disabled={isLoading}
                >
                  {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Al registrarte, aceptas nuestros{" "}
                  <button type="button" className="text-primary hover:underline">
                    términos de servicio
                  </button>{" "}
                  y{" "}
                  <button type="button" className="text-primary hover:underline">
                    política de privacidad
                  </button>
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Additional Help */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            ¿Necesitas ayuda?{" "}
            <button className="text-primary hover:underline font-medium">
              Contacta con soporte
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
